---
meta-title: "X-editable | John Vincent"
meta-description: "John Vincent's discussion on X-editable"
meta-keywords: "X-editable"
title: "X-editable"
subtitle: "Using X-editable"
lead: "In-place editing with Bootstrap, jQuery UI or jQuery."

category: [X-editable]
permalink: /general/using-x-editable/
---

This stuff ends up sprayed everywhere, so let's create a reference document.

<!-- end -->

# X-editable

[X-editable](https://vitalets.github.io/x-editable/)

## Include

The `&#36;.fn.poshytip`  statement is a bug workaround.

```
<script src="//code.jquery.com/jquery-3.1.1.min.js"></script>

<script>$.fn.poshytip={defaults:null}</script>
<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/jquery-editable/js/jquery-editable-poshytip.min.js"></script>

```

### Configure

At app startup, I am defaulting to inline. There are other options, for example popup.

```
$(function () {
    'use strict';

    $.fn.editable.defaults.mode = 'inline';
```

The following I did not use, but I may need in the future.

```
$.fn.editable.defaults.ajaxOptions = {contentType: "application/json"};
$.fn.editable.defaults.ajaxOptions = {dataType: "json"};
```

Create editable actions. This snippet creates an action for editing each item in a collection.

```
data.subscriptions.forEach(function(item, idx) {     // for each subscription
    var select_url = item.url;
    var $id = $('#js--id-'+idx);
    var $edit_title = $id.find('.js--channel-title');

    $edit_title.editable({
        type: 'text',
        pk: select_url,
        url: APP.keys.SUBSCRIPTION_URL+'/title',
        toggle: 'manual',
        success: function(response, newValue) {
            var url = response.url;
            APP.$DOM.main.trigger('subscription-title-updated', url);
        }
    });
});
```

* Each record is defined by `$('#js--id-'+idx)`
* The edit is triggered from button `$('.js--channel-title')`

Thus the editable code is attached to the button.

When user submits the change, the Ajax call is made.

### Toggle: 'manual'

Note

```
toggle: 'manual',
```

This says the code will be triggered later. Do not trigger now.

### Trigger the edit

```
APP.$DOM.left_nav.on('click', APP.$EVENTS.user_selected_update_subscription_title, function(e) {
    e.stopPropagation();
    var $id = $(e.currentTarget).closest('li');
    var $edit_title = $id.find('.js--channel-title');
    $edit_title.editable('toggle');     // enable editing
});
```

Thus, find the editable for this button

```
var $edit_title = $id.find('.js--channel-title');
```

Trigger inline editing

```
$edit_title.editable('toggle');     // enable 
```

## Other

* `$edit_title.editable('destroy');`
	* deletes the editable action.
* `$edit_title.editable('toggleDisabled');`
