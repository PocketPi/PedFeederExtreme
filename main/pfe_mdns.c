#include "pfe_mdns.h"
#include "mdns.h"

#define MDNS_INSTANCE "esp home web server"

void initialise_mdns(void) {
    mdns_init();
    mdns_hostname_set(CONFIG_MDNS_HOST_NAME);
    mdns_instance_name_set(MDNS_INSTANCE);

    mdns_txt_item_t serviceTxtData[] = {{"board", "esp32"}, {"path", "/"}};

    ESP_ERROR_CHECK(mdns_service_add(
        "ESP32-WebServer", "_http", "_tcp", 80, serviceTxtData, sizeof(serviceTxtData) / sizeof(serviceTxtData[0])));
}