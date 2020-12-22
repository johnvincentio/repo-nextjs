---
meta-title: "Delete LinkedIn Messages | John Vincent"
meta-description: "Delete LinkedIn Messages"
meta-keywords: "LinkedIn"

title: "Delete LinkedIn Messages"
subtitle: ""
lead: ""

category: [LinkedIn]
permalink: /general/delete-linkedin-messages/
---

Those LinkedIn messages can become a real nuisance and there is no built-in way of removing them.

<!-- end -->

# Delete LinkedIn Messages

Using Chrome

* Go to your LinkedIn messages https://www.linkedin.com/messaging
* Scroll down through your messages (adds the messages to the DOM)
* Right click, Inspect
* Go to Console tab
* Paste the script (will show later)
* Repeat as needed.

## Script

```
/*
* Delete messages
*/
function deleteMessages() {
	let container = document.querySelector(".msg-thread.relative.display-flex artdeco-dropdown artdeco-dropdown-content");
	let items = container.querySelectorAll("artdeco-dropdown-item");
	for (let i = 0; i < items.length; i++) {
		let text = items[i].textContent.trim();
		if (text === "Delete") {
			items[i].click();		// click on delete option
			break;
		}
	}
}

/*
* Confirm delete
*/
function confirmDelete() {
	let messageModal = document.querySelector("#artdeco-modal-outlet");
	if (! messageModal) return;

	let allBtns = messageModal.querySelectorAll(".artdeco-modal .artdeco-modal__actionbar button");
	if (! allBtns) return;

	let deleteBtn = allBtns[1];			// to delete, use [1], to not delete use [0]
	if (! deleteBtn) return;

	deleteBtn.click();
}

/*
* Find the next message
*/
function findNext() {
	let elem = document.querySelector(".msg-conversations-container__conversations-list .msg-conversation-listitem");
	if (! elem) {
		return false;
	}
	elem.click();
	return true;
}

/*
* main
*/
let count = 0;
var intervalId = setInterval(function() {
	if (++ count > 100) return;			// avoid infinite loops
	if (! findNext()) return;				// find next message thread

	setTimeout(function() {
		deleteMessages();							// delete message thread
		setTimeout(function() {
			confirmDelete();						// confirm delete message thread
		}, 1200);
	}, 500);
}, 2000);
```

## Explanation

It is accepted that the page could be changed at any time. Thus, the philosophy is to build the script as a series of simple pieces that each perform simple, discreet tasks that can be easily rebuilt.

There are 3 main tasks:

* find next message thread
* delete message thread
* confirm delete message thread

Each of these tasks is to be repeated until there are no more message threads.

### Main

Clearly need to use delays. The outer loop uses `setInterval`, else uses `setTimeout`

### findNext()

Find the next message thread and, if found, click it.

### deleteMessages()

* Find the message thread container
* Find the drop down
* Find the `Delete` option
* Click it

### confirmDelete()

* Find the modal
* Find the buttons
* Find the delete button
* Click it

# Other

Could use arrow functions, thus

```
let count = 0;
var intervalId = setInterval(() => {
	if (++count > 100) return;			// avoid infinite loops
	if (! findNext()) return;				// find next message thread

	setTimeout(() => {
		deleteMessages();							// delete message thread
		setTimeout(() => {
			confirmDelete();						// confirm delete message thread
		}, 1200);
	}, 500);
}, 2000);
```

## Promises

Could rebuild as promises, something like:

```
const timeOutPromise = (str) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(str);
    }, 200)
  })
}
timeOutPromise('foo')
  .then((val) => {
    console.log(val);
    return timeOutPromise('bar');
  })
  .then((val) => {
    console.log(val);
    return timeOutPromise('baz');
  })
  .then((val) => {
    console.log(val);
  })
  .catch((err) => console.error(err))
```

## Async / Await

Or better yet:

```
const timeOutPromise = (str) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(str);
    }, 200)
  })
}
(async () => {
  try {
    let val;
    val = await timeOutPromise('foo');
    console.log(val);
    val = await timeOutPromise('bar');
    console.log(val);
    val = await timeOutPromise('baz');
    console.log(val);
  } catch (err) {
    console.error(err);
  }
})();
```

