function watchlist() {
	progressEntries = document.querySelectorAll('.list-entry-progress')
	unwatched = []
	progressEntries.forEach((element) => {
		parent = element.parentElement
		progress = element.textContent.split('/')
		if (progress[0] < progress[1]) {
			parent.classList.add('unwatched')
			parent.style.order = -1
			unwatched.push(parent)
			parent.remove()
		}
		title = parent.querySelector('.list-entry-title > a')
		oldURL = title.getAttribute('href')
		newURL = oldURL.replace('/anime/', '/watch/') + progress[0]
		title.setAttribute('href', newURL)
	})
	list = document.querySelector('.list-entries')
	old = list.querySelectorAll('.list-entry-row')
	list.innerHTML = null
	unwatched.forEach((entry) => {
		list.appendChild(entry)
	})
	old.forEach((node) => {
		list.appendChild(node)
	})
}

function navigator(select) {
	navbar = document.querySelector('.navigation')
	listButton = document.createElement('a')
	listButton.setAttribute('href', '/mylist/?list_status=1')
	listButton.setAttribute('class', 'nav-item')
	listButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                 </svg>My List`
	if (select) {
		listButton.setAttribute('data-selected', '')
	}
	navbar.insertBefore(listButton, navbar.children[5])
}

function loader() {
	page = window.location.toString().split('/')[3]
	nav = false
	switch (page) {
		case 'mylist':
			navigator(true)
			nav = true
			watchlist()
			break
	}
	if (!nav) {
		navigator()
	}
}

loader()
