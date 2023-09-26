#ifndef WIFI_SCANNER_H
#define WIFI_SCANNER_H

#include "esp_wifi.h"
#include <inttypes.h>

int wifi_scan(wifi_ap_record_t *ap_info, uint16_t scan_list_size);

#endif // WIFI_SCANNER_H