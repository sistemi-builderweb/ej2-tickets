document.addEventListener("DOMContentLoaded", init);

var key = config.SECRET_API_KEY;

// Registering Syncfusion license key
ej.base.registerLicense(key);

function init() {
    var url = "https://app-syncfusiondatasources.azurewebsites.net/api/DataSource?fileName=dropDownTree";
    var __extends = (this && this.__extends) ||
        (function () {
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) {
                        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);

                function __() {
                    this.constructor = d;
                }

                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
    var SistemiAjaxDataAdaptor = /** @class */ (function (_super) {
        __extends(SistemiAjaxDataAdaptor, _super);

        function SistemiAjaxDataAdaptor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }

        SistemiAjaxDataAdaptor.prototype.beforeSend = function (dataSource, request, ajax) {
            var data = JSON.parse(ajax.data);
            ajax.data = JSON.stringify(data.value);
        };
        return SistemiAjaxDataAdaptor;
    }(ej.data.CustomDataAdaptor));

    $(document).ajaxSuccess(function (event, jqXHR, ajaxOptions, data) {

        if (!ajaxOptions.noLastServerInteraction) {
            window.lastServerInteraction = new Date();
        }
    });

    window.ajax = $.ajax; // assign the default ajax function to local variable
    var ajaxQueue = $({});

    /*LOG PERFORMACE*/
    //var firstStart = null;
    /*END PERFORMACE*/
    $.ajaxQueue = function (ajaxOpts) {
        var jqXHR,
            dfd = $.Deferred(),
            promise = dfd.promise();

        // run the actual query
        function doRequest(next) {
            if (!ajaxOpts.vidId || $('#' + ajaxOpts.vidId).length !== 0) {
                jqXHR = window.ajax(ajaxOpts);

                jqXHR.done(dfd.resolve)
                    .fail(dfd.reject)
                    .then(next, next);

            }
            else {
                next();
            }
        }

        // queue our ajax request
        ajaxQueue.queue(doRequest);

        // add the abort method
        promise.abort = function (statusText) {

            // proxy abort to the jqXHR if it is active
            if (jqXHR) {
                return jqXHR.abort(statusText);
            }

            // if there wasn't already a jqXHR we need to remove from queue
            var queue = ajaxQueue.queue(),
                index = $.inArray(doRequest, queue);

            if (index > -1) {
                queue.splice(index, 1);
            }

            // and then reject the deferred
            dfd.rejectWith(ajaxOpts.context || ajaxOpts, [promise, statusText, ""]);
            return promise;
        };

        return promise;
    };

    $.ajax = $.ajaxQueue; //set the default jquery ajax function as ajaxQueue

    var dataSource = [];
    dataSource = new ej.data.DataManager({
        url: url,
        adaptor: new SistemiAjaxDataAdaptor(
            {
                getData: function (option) {
                    $.ajaxQueue({
                        url: url,
                        type: 'POST',
                        dataType: 'json',
                        data: option.data,
                        contentType: 'application/json; charset=utf-8',
                        success: function (data, textStatus, request) {
                            var newReq = {};
                            newReq.data = this.data;
                            newReq.httpRequest = request;
                            option.onSuccess(data, newReq);
                        },
                        error: function (request) {
                            var newReq = {};
                            newReq.httpRequest = request;
                            option.onFailure(newReq);
                        },
                    });
                }
            }
        ),
        crossDomain: true
    });
    
    var query = new ej.data.Query();
    query.take(500);

    var dropDownTreeObj = new ej.dropdowns.DropDownTree({
        allowFiltering: true,
        ignoreCase: true,
        filterType: 'Contains',
         treeSettings: {
             loadOnDemand: true,
         },
        fields: {
            dataSource: dataSource,
            query: query,
            value: 'id',
            text: 'text',
            htmlAttributes: 'htmlAttribute',
            parentValue: 'pid',
            hasChildren: 'hasChild'
        },
        popupHeight: '500px',
        popupWidth: '380px',
        readOnly: true,
        showClearButton: false,
        changeOnBlur: false,
        select: function (args) {

            // if ($input.prop('currentValue')!= args.itemData.id)
            //     $input.Wrapper().triggerEvent(BC_const.EVENTS.InputChange, args.isInteracted);
        },
        created: function (args) {
            this.treeObj.nodeExpanding = (args) => {
                if (args.node.classList.contains('sisDisabledNode')) {
                    args.cancel = true;
                }
            };
            this.treeObj.nodeSelecting = (args) => {
                if (args.node.classList.contains('sisDisabledNode')) {
                    args.cancel = true;
                }
            }
            // dropDownTreeObj.value = ['124259_1008'];
            // dropDownTreeObj.text='Chiara ditta';
        },
        //dataBind: function (args) {
            // dropDownTreeObj.value = ['124259_1008'];
        //}
    });

    dropDownTreeObj.appendTo(document.getElementById('DropDownTree'));

    //dropDownTreeObj.value = ['124259_1008'];
    
    setTimeout(function () {
        var ej2Obj = document.getElementById('DropDownTree').ej2_instances[0];
        ej2Obj.value = ['124244_1014'];
    },2000);

    setTimeout(function () {
        var ej2Obj = document.getElementById('DropDownTree').ej2_instances[0];
        ej2Obj.value = ['124244_1014'];
    },4000);
    
}
