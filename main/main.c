#include "esp_log.h"
#include "esp_spiffs.h"
#include "lwip/apps/netbiosns.h"
#include "nvs_flash.h"
#include "pfe_mdns.h"
#include "wifi_sta.h"
#include "rest_server.h"

static const char *FS_TAG = "fs";

esp_err_t init_fs(void) {
    esp_vfs_spiffs_conf_t conf = {.base_path = CONFIG_WEB_MOUNT_POINT,
                                  .partition_label = NULL,
                                  .max_files = 5,
                                  .format_if_mount_failed = false};
    esp_err_t ret = esp_vfs_spiffs_register(&conf);

    if (ret != ESP_OK) {
        if (ret == ESP_FAIL) {
            ESP_LOGE(FS_TAG, "Failed to mount or format filesystem");
        } else if (ret == ESP_ERR_NOT_FOUND) {
            ESP_LOGE(FS_TAG, "Failed to find SPIFFS partition");
        } else {
            ESP_LOGE(FS_TAG, "Failed to initialize SPIFFS (%s)", esp_err_to_name(ret));
        }
        return ESP_FAIL;
    }

    size_t total = 0, used = 0;
    ret = esp_spiffs_info(NULL, &total, &used);
    if (ret != ESP_OK) {
        ESP_LOGE(FS_TAG, "Failed to get SPIFFS partition information (%s)", esp_err_to_name(ret));
    } else {
        ESP_LOGI(FS_TAG, "Partition size: total: %d, used: %d", total, used);
    }
    return ESP_OK;
}

void app_main(void) {
    ESP_ERROR_CHECK(nvs_flash_init());
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    initialise_mdns();
    netbiosns_init();
    netbiosns_set_name(CONFIG_MDNS_HOST_NAME);

    // We do not care about ap mode for now
    // uint16_t scan_list_size = 5;
    // wifi_ap_record_t ap_info[scan_list_size];
    // uint16_t scanned_ap_count = wifi_scan(ap_info, scan_list_size);

    wifi_connect();

    ESP_ERROR_CHECK(init_fs());
    ESP_ERROR_CHECK(start_rest_server(CONFIG_WEB_MOUNT_POINT));
}
