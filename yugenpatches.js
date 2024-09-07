async function watchlist() {
	progressEntries = document.querySelectorAll('.list-entry-progress')
	unwatched = []
	progressEntries.forEach((element) => {
		parent = element.parentElement
		progress = element.textContent.split('/')
		console.log(progress)
		if (parseInt(progress[0]) < parseInt(progress[1])) {
			console.log(parent)
			parent.classList.add('unwatched')
			parent.style.order = -1
			unwatched.push(parent)
			parent.remove()
		}
		if (config.go_to_last_ep) {
			title = parent.querySelector('.list-entry-title > a')
			oldURL = title.getAttribute('href')
			newURL = oldURL.replace('/anime/', '/watch/') + progress[0]
			title.href = newURL
		}
		parent.querySelector('.anime-edit').innerHTML = '<i class="fa-solid fa-pen"></i>'
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
	if (config.hide_scores) {
		scores = list.querySelectorAll('.list-entry-score').forEach((node) => {
			node.style.display = 'none'
		})
		document.querySelector('.list-score').style.display = 'none'
	}
}

async function navigator(select) {
	navbar = document.querySelector('.navigation')
	if (config.mylist_nav) {
		listButton = document.createElement('a')
		listButton.href = '/mylist/?list_status=1'
		listButton.classList = 'nav-item'
		listButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark">
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
        </svg>My List`
		if (select) {
			listButton.setAttribute('data-selected', '')
		}
		navbar.insertBefore(listButton, navbar.children[5])
	}
	if (config.nav_hide_trending) {
		navbar.querySelector('a[href="/trending/"]').style.display = 'none'
	}
	if (config.nav_hide_recents) {
		navbar.querySelector('a[href="/latest/"]').style.display = 'none'
	}
	if (config.nav_hide_discover) {
		navbar.querySelector('a[href="/discover/"]').style.display = 'none'
	}
	if (config.nav_more_title) {
		navbar.querySelector('.nav-item-more').innerHTML += '<p>View More</p>'
	}
	if (config.nav_hide_titles) {
		document.querySelectorAll('.navigation > .nav-item').forEach((node) => {
			node.classList.add('noTitle')
		})
	}
}

async function settings(force) {
	if (force) {
		subpage = 'YugenPatches'
	} else {
		subpage = window.location.toString().split('#')[1]
	}
	buttons = document.querySelector('.m-10-t')
	if (buttons.querySelector('.yugenpatches') == undefined) {
		button = document.createElement('a')
		button.href = '/settings/privacy/#YugenPatches'
		button.classList = 'settings-option yugenpatches'
		button.addEventListener('click', function () {
			settings(true)
		})
		button.innerHTML = `<i class="fa-solid fa-wrench"></i> YugenPatches`
	} else {
		button = buttons.querySelector('.yugenpatches')
	}
	if (subpage == 'YugenPatches') {
		button.classList = 'settings-option yugenpatches active'
		buttons.querySelector('a[href="/settings/privacy/"]').classList.remove('active')
		body = document.querySelectorAll('.page--content section')[1]
		body.innerHTML = ''
		header = document.createElement('div')
		header.classList = 'box box-accent p-15 m-10-b'
		header.innerHTML = `
        <h2 class="ya-title">YugenPatches</h2>
        <p class="description">Settings for the YugenPatches extension</p>`
		body.appendChild(header)
		section = document.createElement('div')
		section.classList = 'box p-20'
		section.innerHTML = `
            <section>
                <div class="section m-10-b">
                    "My List" in navigation bar
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="mylist_nav" class="settings-checkbox yps" ${config.mylist_nav ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Display "My List" button in the navigation bar.
                    </p>
                </div>
            </section>
            <section class="m-25-t">
                <div class="section m-10-b">
                    Go to last watched episode
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="go_to_last_ep" class="settings-checkbox yps" ${config.go_to_last_ep ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Changes the click behavior of entries in the watch list to go to the last watched episode instead of the anime page.
                    </p>
                </div>
            </section>
            <div class="m-25-t">
                <div class="section m-10-b">MyAnimeList</div>
                <input type="text" name="custom_accent" class="main-input-box" placeholder="#07bf67">
            </div>
            <section class="m-25-t">
                <div class="section m-10-b">
                    Hide scores in the watch list
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="hide_scores" class="settings-checkbox yps" ${config.hide_scores ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Hides the scores column in the watch list.
                    </p>
                </div>
            </section>
            <section class="m-25-t">
                <div class="section m-10-b">
                    Hide "Trending" from navigation bar
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="nav_hide_trending" class="settings-checkbox yps" ${config.nav_hide_trending ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Hides the "Trending" button from navigation bar.
                    </p>
                </div>
            </section>
            <section class="m-25-t">
                <div class="section m-10-b">
                    Hide "Recents" from navigation bar
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="nav_hide_recents" class="settings-checkbox yps" ${config.nav_hide_recents ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Hides the "Recents" button from navigation bar.
                    </p>
                </div>
            </section>
            <section class="m-25-t">
                <div class="section m-10-b">
                    Hide "Discover" from navigation bar
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="nav_hide_discover" class="settings-checkbox yps" ${config.nav_hide_discover ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Hides the "Discover" button from navigation bar.
                    </p>
                </div>
            </section>
            <section class="m-25-t">
                <div class="section m-10-b">
                    Add title to "View More" button (mobile)
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="nav_more_title" class="settings-checkbox yps" ${config.nav_more_title ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Adds title to the "View More" navigation bar button.</br>
                        Mobile interface only.
                    </p>
                </div>
            </section>
            <section class="m-25-t">
                <div class="section m-10-b">
                    Hide navigation bar titles
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="nav_hide_titles" class="settings-checkbox yps" ${config.nav_hide_titles ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Hides titles from buttons in the navigation bar.
                    </p>
                </div>
            </section>
            <section class="m-25-t">
                <div class="section m-10-b">
                    English title only on homepage
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="eng_titles" class="settings-checkbox yps" ${config.eng_titles ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Displays only the english title on the homepage.</br>
                        <span class="important"><i class="fa-solid fa-circle-exclamation"></i> "English Title" must be enabled in settings.</span>
                    </p>
                </div>
            </section>
            <section class="m-25-t">
                <div class="section m-10-b">
                    Hide episode details on homepage
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="hide_stats" class="settings-checkbox yps" ${config.hide_stats ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Hides episode details (views and release time) on the homepage
                    </p>
                </div>
            </section>
            <section class="m-25-t">
                <div class="section m-10-b">
                    Hide episode thumbnails in list.
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="ep_hide_thumbnails" class="settings-checkbox yps" ${config.ep_hide_thumbnails ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Hides episode thumbnails in the episodes list.
                    </p>
                </div>
            </section>
            <section class="m-25-t">
                <div class="section m-10-b">
                    Hide episode details in list.
                </div>
                <div class="flex justify-start align-center">
                    <label class="switch m-10-r">
                        <input type="checkbox" name="ep_hide_stats" class="settings-checkbox yps" ${config.ep_hide_stats ? 'checked' : ''}>
                        <span id="slider" class="slider round"></span>
                    </label>
                    <p class="description">
                        Hides episode details (views and release time) in the episodes list.
                    </p>
                </div>
            </section>
        `

		body.appendChild(section)
		document.querySelectorAll('.yps').forEach((node) => {
			node.addEventListener('change', function () {
				localStorage.setItem(this.name, this.checked)
			})
		})
		document.querySelector('input[name="custom_accent"]').addEventListener('change', function () {
			const regex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
			if (!regex.test(this.value)) {
				return
			}
			hex = this.value.replace('#', '')
			r = parseInt(hex.slice(0, 2), 16)
			g = parseInt(hex.slice(2, 4), 16)
			b = parseInt(hex.slice(4, 6), 16)
			rgb = `${r}, ${g}, ${b}`
			document.documentElement.style.setProperty('--color-theme', rgb)
			localStorage.setItem(this.name, rgb)
		})
	}
	buttons.appendChild(button)
}

async function homepage() {
	if (config.eng_titles || config.hide_stats) {
		episodes = document.querySelectorAll('.ep-card')
		episodes.forEach((node) => {
			if (config.eng_titles) {
				title = node.querySelector('.ep-title')
				eng = node.querySelector('.ep-origin-name')
				title.textContent = eng.textContent
				eng.remove()
			}
			if (config.hide_stats) {
				node.querySelector('.ep-statistics').remove()
			}
		})
	}
}

async function watchpage() {
	window.addEventListener('resize', function () {
		if (window.innerWidth < 1047) {
			episodes = document.querySelector('.ep-list').parentElement
			episodes.style.order = '-1'
		} else {
			episodes = document.querySelector('.ep-list').parentElement
			episodes.style.order = ''
		}
	})
	base = window.location
		.toString()
		.match(/https:\/\/(\w|\d)*\.(\w|\d)*\//)[0]
		.slice(0, -1)
	episodes = document.querySelector('.ep-list').parentElement
	if (window.innerWidth < 1047) {
		episodes.style.order = '-1'
	}
	entries = episodes.querySelectorAll('.ep-card')
	current = window.location.toString().split('/')
	current = current[current.length - 2]
	entries.forEach((node) => {
		node.classList.add('box')
		if (config.ep_hide_thumbnails) {
			node.querySelector('.ep-thumbnail').remove()
		}
		if (config.ep_hide_stats) {
			node.querySelector('.ep-statistics').remove()
		}
		title = node.querySelector('.ep-title')
		epNumber = title.textContent.match(/(\d)+(?:\s:\s)/)[0].slice(0, -2)
		if (epNumber == current) {
			title.parentElement.parentElement.classList.add('ep-current')
		}
		epTitle = title.textContent.match(/(?:\d+\s:\s)(.*)/)[1]
		title.innerHTML = `<span class="ep-number">${epNumber}</span> <span class="ep-title-text">${epTitle}</span>`
		node.addEventListener('click', function () {
			window.location.replace(base + this.querySelector('.ep-title').getAttribute('href'))
		})
	})
}

async function loader() {
	document.documentElement.style.setProperty('--color-theme', config.custom_accent)
	page = window.location.toString().split('/')[3]
	nav = false
	switch (page) {
		case 'mylist':
			navigator(true)
			nav = true
			watchlist()
			break
		case 'settings':
			settings()
			break
		case '':
			homepage()
			break
		case 'watch':
			watchpage()
			break
	}
	if (!nav) {
		navigator()
	}
}

function bool(str) {
	return str === 'true'
}

config = {
	mylist_nav: bool(localStorage.getItem('mylist_nav')),
	custom_accent: localStorage.getItem('custom_accent'),
	go_to_last_ep: bool(localStorage.getItem('go_to_last_ep')),
	hide_scores: bool(localStorage.getItem('hide_scores')),
	nav_hide_trending: bool(localStorage.getItem('nav_hide_trending')),
	nav_hide_recents: bool(localStorage.getItem('nav_hide_recents')),
	nav_hide_discover: bool(localStorage.getItem('nav_hide_discover')),
	nav_more_title: bool(localStorage.getItem('nav_more_title')),
	nav_hide_titles: bool(localStorage.getItem('nav_hide_titles')),
	eng_titles: bool(localStorage.getItem('eng_titles')),
	hide_stats: bool(localStorage.getItem('hide_stats')),
	ep_hide_thumbnails: bool(localStorage.getItem('ep_hide_thumbnails')),
	ep_hide_stats: bool(localStorage.getItem('ep_hide_stats')),
}

loader()
