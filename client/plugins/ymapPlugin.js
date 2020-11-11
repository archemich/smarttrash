import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

const settings = {
    api: 'f7f74222-a0e8-47a6-b4e8-b4e8e6b2307e',
    lang: 'ru_RU',
    version: '2.1'
} // настройки плагина

Vue.use(YmapPlugin, settings);