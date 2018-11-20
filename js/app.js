const cat_name_list = ["cat1","cat2","cat3","cat4","cat5"];
const cat_img_url_list = ["img/cat1.jpg","img/cat2.jpg","img/cat3.jpg","img/cat4.jpg","img/cat5.jpg"];
const cat_clicked_times_array = [0,0,0,0,0];

const data = {
    catname : cat_name_list,
    caturl : cat_img_url_list,
    catclicked : cat_clicked_times_array,
    currentindex : 0,
};

const octopus = {
    init : function () {
        view_cat_detail.init();
        view_cat_list.init();
        view_admin_manager.init();
    },

    getCatNameByIndex : function () {
        return data.catname[data.currentindex];
    },

    getCatUrlByIndex : function () {
        return data.caturl[data.currentindex];
    },

    increaseClickedtimes : function () {
        let oldvalue = data.catclicked[data.currentindex];
        data.catclicked[data.currentindex] = ++oldvalue;
    },

    getClickedtimesByIndex : function () {
        return data.catclicked[data.currentindex];
    },

    setCurrentClickIndex: function (index) {
        data.currentindex = index;
    },

    getCurrentClickIndex : function () {
        return data.currentindex;
    },

    updatecatinfo : function () {
        const new_name = view_admin_manager.catform_name.value;
        const new_imgurl = view_admin_manager.catform_imgurl.value;
        const new_clicks = view_admin_manager.catform_clicks.value;

        data.catname[data.currentindex] = new_name;
        data.caturl[data.currentindex] = new_imgurl;
        data.catclicked[data.currentindex] = new_clicks;

        alert(data.currentindex);
        view_cat_detail.render();
        view_admin_manager.hideadmin();
    }

};

const view_admin_manager = {
    init : function () {
        this.catform = document.getElementById("updatecatinfoform");
        this.catform_name = document.getElementById("input_catname");
        this.catform_imgurl = document.getElementById("input_imgurl");
        this.catform_clicks = document.getElementById("input_clicks");
        this.hideadmin();
    },
    showadmin :function () {
        this.catform.hidden = false;
    },

    hideadmin :function () {
        this.catform.hidden = true;
    },

}

const view_cat_list = {
    init : function () {
        this.list = document.getElementById("cat_list");
        for(let i = 0; i< data.catname.length; i++){
            const elem = document.createElement("div");
            elem.textContent = cat_name_list[i];
            elem.addEventListener('click',(function(index){
                return function(){
                    view_cat_list.render(index);
                }
            })(i));
            this.list.appendChild(elem);
        }
    },

    render:function (index) {
        octopus.setCurrentClickIndex(index);
        cat_name_div.textContent = octopus.getCatNameByIndex();
        cat_img.setAttribute('src',octopus.getCatUrlByIndex());
    }

};

const view_cat_detail = {
    init : function () {
        this.container = document.getElementById("cat_container");
        this.cat_name_div = document.createElement("h1");
        this.cat_clicked_times = document.createElement("h1");
        this.cat_name_div.setAttribute("id","cat_name_div");
        this.cat_clicked_times.setAttribute("id","cat_clicked_times_div");
        this.container.appendChild(this.cat_name_div);
        this.cat_img = document.createElement('img');
        this.cat_img.setAttribute("id","cat_img");
        const self = this;
        this.cat_img.addEventListener('click',(function(ctx){
            return function(){
                octopus.increaseClickedtimes();
                ctx.render();
            }
        })(self));
        this.container.appendChild(this.cat_img);
        this.container.appendChild(this.cat_clicked_times);
    },

    render : function(){
        this.cat_name_div.textContent = octopus.getCatNameByIndex();
        this.cat_clicked_times.textContent = octopus.getClickedtimesByIndex();
        this.cat_img.src = octopus.getCatUrlByIndex();
    }
};


octopus.init();