/*
 * Ext JS Library 3.0 RC2
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */


   
var contextdata = new Ext.data.JsonStore({
        root: 'courses',
        totalProperty: 'totalCount',
        idProperty: 'contextcode',
        remoteSort: false,        
        fields: ['contextcode', 'title', 'author', 'datecreated', 'lastupdated','status','excerpt' ],
        proxy: new Ext.data.HttpProxy({        	 	
            	url: uri
        }),
        listeners:{ 
    		'loadexception': function(theO, theN, response){
    			//alert(response.responseText);
    		},
    		'load': function(){
    				//alert('load');	
    			}
    	}
	});
	 contextdata.setDefaultSort('lastupdated', 'desc');
	 
    // pluggable renders
    function renderTopic(value, p, record){
    	if (record.data.status == 'Unpublished'){
			pub = '<span class="warning">[Unpublished]</span>';
		}else{
			pub = "";
		}
        return String.format(
        		'<b><a href="'+baseuri+'?module=context&action=joincontext&contextcode={1}">{0}</a> {2} </b>', value, record.data.contextcode, pub);
                /*'<b><a href="http://localhost/eteach/index.php?module=context&action=joincontext&contextcode={2}" target="_blank">{0}</a></b>
                <a href="http://extjs.com/forum/forumdisplay.php?f={3}" target="_blank">{1} Forum</a>',
                value, record.data.title, record.id, record.data.contextcode);*/
    }
    function renderLast(value, p, r){
        return String.format('{0}<br/>by {1}', value.dateFormat('M j, Y, g:i a'), r.data['lastposter']);
    }

    var grid = new Ext.grid.GridPanel({
        //el:'topic-grid',
        width:"100%",
        height:400,
        title:'Browse Courses',
        store: contextdata,
        trackMouseOver:false,
        disableSelection:true,
        loadMask: true,
        autoScroll:true,

        // grid columns
        columns:[
        {
            header: "Code",
            dataIndex: 'contextcode',
            width: 100,            
            sortable: true
        },{
            id: 'topic', // id assigned so we can apply custom css (e.g. .x-grid-col-topic b { color:#333 })
            header: lang['context'],
            dataIndex: 'title',
            width: 220,
            renderer: renderTopic,
            sortable: true
        },{
            header: "Creator",
            dataIndex: 'author',
            width: 100,
            hidden: false,
            sortable: true
        },{
            header: "Date Created",
            dataIndex: 'datecreated',
            width: 70,
            align: 'right',
            sortable: true
        },{
            header: "Last Updated",
            dataIndex: 'lastupdated',
            width: 100,
            align: 'right',
            sortable: true
        }],

        // customize view config
        viewConfig: {
            forceFit:true,
            enableRowBody:true,
            showPreview:false,
            getRowClass : function(record, rowIndex, p, store){
                if(this.showPreview){
                    p.body = '<p>'+record.data.excerpt+'</p>';
                    return 'x-grid3-row-expanded';
                }
                return 'x-grid3-row-collapsed';
            }
        },

        // paging bar on the bottom
        bbar: new Ext.PagingToolbar({
            pageSize: pageSize,
            store: contextdata,
            displayInfo: true,
            displayMsg: 'Displaying '+lang['contexts']+' {0} - {1} of {2}',
            emptyMsg: "No '+lang['contexts']+' to display",
            items:[
                '-', {
                pressed: false,
                enableToggle:true,
                text: 'Show About',
                cls: 'x-btn-text-icon details',
                toggleHandler: function(btn, pressed){
                    var view = grid.getView();
                    view.showPreview = pressed;
                    view.refresh();
                }
            }]
        })
    });
/*Ext.onReady(function(){
    // render it
    grid.render();

    // trigger the data store load
    contextdata.load({params:{start:0, limit:pageSize}});
});*/
