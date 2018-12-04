openerp.ext_completion_input_options = function(instance) {
    var _t = instance.web._t;

    var get_search_result = function(search_val) {
        var self = this;

        if(self.options['limit'] && parseInt(self.options['limit']) > 0) {
            self.limit = parseInt(self.options['limit']);
        }

        var dataset = new instance.web.DataSet(this, this.field.relation, self.build_context());
        var blacklist = this.get_search_blacklist();
        this.last_query = search_val;

        return this.orderer.add(dataset.name_search(
                search_val, new instance.web.CompoundDomain(self.build_domain(), [["id", "not in", blacklist]]),
                'ilike', this.limit + 1, self.build_context())).then(function(data) {
            self.last_search = data;
            // possible selections for the m2o
            var values = _.map(data, function(x) {
                x[1] = x[1].split("\n")[0];
                return {
                    label: _.str.escapeHTML(x[1]),
                    value: x[1],
                    name: x[1],
                    id: x[0],
                };
            });

            // search more... if more results that max
            // default: true
            if (values.length > self.limit && (!('search_more' in self.options) || self.options['search_more'])) {
                values = values.slice(0, self.limit);
                values.push({
                    label: _t("Search More..."),
                    action: function() {
                        dataset.name_search(search_val, self.build_domain(), 'ilike', 160).done(function(data) {
                            self._search_create_popup("search", data);
                        });
                    },
                    classname: 'oe_m2o_dropdown_option'
                });
            }
            // quick create
            // default: false
            if(self.options['quick_create']) {
                var raw_result = _(data.result).map(function(x) {return x[1];});
                if (search_val.length > 0 && !_.include(raw_result, search_val)) {
                    values.push({
                        label: _.str.sprintf(_t('Create "<strong>%s</strong>"'),
                            $('<span />').text(search_val).html()),
                        action: function() {
                            self._quick_create(search_val);
                        },
                        classname: 'oe_m2o_dropdown_option'
                    });
                }
            }
            // create...
            // default: true
            if(!('create' in self.options) || self.options['create']) {
                values.push({
                    label: _t("Create and Edit..."),
                    action: function() {
                        self._search_create_popup("form", undefined, self._create_context(search_val));
                    },
                    classname: 'oe_m2o_dropdown_option'
                });
            }

            return values;
        });
    };

    instance.web.form.FieldMany2One = instance.web.form.FieldMany2One.extend({
        'get_search_result': get_search_result
    });

    instance.web.form.FieldMany2ManyTags = instance.web.form.FieldMany2ManyTags.extend({
        'get_search_result': get_search_result
    });

    instance.web.form.FieldMany2ManyKanban = instance.web.form.FieldMany2ManyKanban.extend({
        'get_search_result': get_search_result
    });

}