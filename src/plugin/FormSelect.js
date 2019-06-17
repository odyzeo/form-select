import FormSelect from '../components/FormSelect.vue';

export {
    FormSelect,
};

function registerComponents(Vue, prefix) {
    Vue.component(`${prefix}FormSelect`, FormSelect);
    Vue.component(`${prefix}form-select`, FormSelect);
}

const Plugin = {
    install(Vue, options = {}) {
        if (this.installed) return;
        this.installed = true;

        const finalOptions = {
            installComponents: true,
            componentsPrefix: '',
            ...options,
        };

        this.options = finalOptions;

        function subscribeFormSelect(item) {
            Plugin.activeItems.push(item);
        }

        function unsubscribeFormSelect(item) {
            const index = Plugin.activeItems.indexOf(item);

            if (index !== -1) {
                Plugin.activeItems.splice(index, 1);
            }
        }

        function callFunctionOnFormSelect(name, functionName) {
            Plugin.activeItems
                .filter(item => (name && item.groupName !== '' && item.groupName === name) || !name)
                .forEach((item) => {
                    item[functionName]();
            });
        }

        function getErrors(name) {
            const errors = [];

            Plugin.activeItems
                .filter(item => (name && item.groupName !== '' && item.groupName === name) || !name)
                .forEach((item) => {
                    if (item.errors.length > 0) {
                        errors.push(...item.errors);
                    }
            });

            return errors;
        }

        /**
         * Main logic
         */
        this.event = new Vue();
        this.activeItems = [];

        this.event.$on('subscribe', subscribeFormSelect);
        this.event.$on('unsubscribe', unsubscribeFormSelect);

        /**
         * Plugin API
         */
        // eslint-disable-next-line
        Vue.prototype.$formSelect = {
            // methods
            validate(name) {
                callFunctionOnFormSelect(name, 'validate');
            },
            clear(name) {
                callFunctionOnFormSelect(name, 'clear');
            },
            getErrors(name) {
                return getErrors(name);
            },

            // properties
            event: this.event,
        };

        if (finalOptions.installComponents) {
            registerComponents(Vue, finalOptions.componentsPrefix);
        }
    },
};

// Auto-isntall
let GlobalVue = null;
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
}
if (GlobalVue) {
    GlobalVue.use(Plugin);
}

export default Plugin;
