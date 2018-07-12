var TmplService={
    remarks:'<ul class="complete">\
                {{each(i,item) historyNote}}\
                <li class="remarks" data-id="${$data.id}">\
                    <div class="item-title comment">备注${i+1}</div>\
                    <p class="details closed">${item.noteInfo}</p>\
                    <san class="time" style="float: right;margin-right: 50px;line-height: 20px">${item.createTime}</san>\
                </li>\
                {{/each}}\
            </ul>',
    remark:'<li class="remarks" data-id="">\
                <div class="item-title comment">备注${index}</div>\
                <p class="details closed">${noteInfo}</p>\
                <span class="time" style="float: right;margin-right: 50px;line-height: 20px">${createTime}</span>\
            </li>',
    commented:'<ul class="complete">\
                    <li class="remarks" data-id="${$data.id}">\
                        <div class="item-title comment">备注1</div>\
                        <p class="details closed">${remark}</p>\
                        <san class="time" style="float: right;margin-right: 50px;line-height: 20px">${createTime}</san>\
                    </li>\
                </ul>',

};