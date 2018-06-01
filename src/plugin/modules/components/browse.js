define([
    'knockout',
    'kb_knockout/lib/viewModelBase',
    'kb_knockout/registry',
    'kb_knockout/lib/generators',
    'kb_common/html'
], function (
    ko,
    ViewModelBase,
    reg,
    gen,
    html
) {
    'use strict';

    let t = html.tag,
        div = t('div'),
        label = t('label'),
        button = t('button'),
        select = t('select'),
        option = t('option'),
        span = t('span'),
        table = t('table'),
        thead = t('thead'),
        tbody = t('tbody'),
        tr = t('tr'),
        th = t('th'),
        td = t('td');

    class ViewModel extends ViewModelBase {
        constructor(params) {
            super(params);
            this.alerts = params.alerts;
            this.delete = params.actions.deleteAlert;
            this.edit = params.actions.editAlert;
        }
    }

    function buildMenu() {
        return div([
            div({
                class:'btn-toolbar',
                style: {
                    display: 'inline-block'
                }
            }, [
                div({
                    class: 'btn-group'
                }, [
                    span({
                        class: 'btn'
                    }, 'Browsing Alerts'),

                ]),
    
                button({
                    class: 'btn btn-default'
                }, 'New'),

                div({
                    class: 'btn-group',
                    style: {
                        marginLeft: '12px'
                    }
                }, div({
                    class: 'form-inline'
                }, [
                    label('Show'),
                    select({
                        class: 'form-control'
                    }, [
                        option('Active'),
                        option('Upcoming'),
                        option('Expired'),
                        option('Canceled'),
                        option('All')
                    ])
                ]))
            ])
        ]);
    }

    function buildBrowseTable() {
        return div([
            table({
                class: 'table table-striped'
            }, [
                thead([
                    tr([
                        th('Title'),
                        th('Description'),
                        th('Start at'),
                        th('End at'),
                        th()
                    ])
                ]),
                tbody({
                    dataBind: {
                        foreach: 'alerts'
                    }
                }, tr([
                    td({
                        dataBind: {
                            text: 'title'
                        }
                    }),
                    td({
                        dataBind: {
                            text: 'description'
                        }
                    }),
                    td({
                        dataBind: {
                            typedText: {
                                value: 'startAt',
                                type: '"date"',
                                format: '"YYYY-MM-DD @ HH:MMa"'
                            }
                        }
                    }),
                    td({
                        dataBind: {
                            typedText: {
                                value: 'endAt',
                                type: '"date"',
                                format: '"YYYY-MM-DD @ HH:MMa"'
                            }
                        }
                    }),
                    td([
                        div({
                            class: 'btn-group'
                        }, [
                            div({
                                class: 'btn btn-default',
                                dataBind: {
                                    click: 'function(d,e){return $component.edit.call($component,d,e);}'
                                }
                            }, span({
                                class: 'fa fa-edit'
                            })),
                            div({
                                class: 'btn btn-danger',
                                dataBind: {
                                    click: 'function(d,e){return $component.delete.call($component,d,e);}'
                                }
                            }, span({
                                class: 'fa fa-trash'
                            }))
                        ])
                    ])
                ]))
            ])
        ]);
    }

    function template() {
        return div([
            buildMenu(),
            buildBrowseTable()
        ]);
    }

    function component() {
        return {
            viewModel: ViewModel,
            template: template()
        };
    }

    return reg.registerComponent(component);
});