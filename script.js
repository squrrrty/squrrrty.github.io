// Данные о фильмах
const movies = [
    {
      id: 1,
      title: "Дюна: Часть вторая",
      poster: "https://avatars.mds.yandex.net/get-mpic/5319329/2a0000018e3b33e1bd8d77d8afca2d1afcb1/orig",
      genre: "Фантастика, приключения",
      director: "Дени Вильнёв",
      cast: "Тимоти Шаламе, Зендея, Ребекка Фергюсон, Джош Бролин",
      ageRating: "12+",
      duration: "166 мин.",
      description:
        "Продолжение истории Пола Атрейдеса, который объединяется с Чани и фрименами, чтобы отомстить заговорщикам, уничтожившим его семью. Выбирая между любовью всей его жизни и судьбой известной вселенной, он стремится предотвратить ужасное будущее, которое только он может предвидеть.",
      trailerUrl: "https://vk.com/video-60649948_456242071?ysclid=ma4bpd1zos138830481",
      videoSource: "rutube",
    },
    {
      id: 2,
      title: "Бэтмен",
      poster: "https://i.pinimg.com/736x/ef/16/98/ef16983cbc1ba510a4a2bd167ebaaca6.jpg",
      genre: "Боевик, криминал, драма",
      director: "Мэтт Ривз",
      cast: "Роберт Паттинсон, Зои Кравиц, Джеффри Райт, Колин Фаррелл",
      ageRating: "16+",
      duration: "176 мин.",
      description:
        "Когда серийный убийца начинает убивать ключевых политических фигур в Готэме, Бэтмен вынужден расследовать скрытую коррупцию города и поставить под сомнение причастность своей семьи.",
      trailerUrl: "https://vk.com/video-49271166_456247928", // Пример ссылки на VK видео
      videoSource: "vk",
    },
    {
      id: 3,
      title: "Душа",
      poster:
        "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_672f87a35fe4460b622f9961_672f8ad2f46b0f0caca87160/scale_1200",
      genre: "Мультфильм, приключения, комедия",
      director: "Пит Доктер, Кемп Пауэрс",
      cast: "Джейми Фокс, Тина Фей, Грэм Нортон, Рэйчел Хаус",
      ageRating: "6+",
      duration: "100 мин.",
      description:
        "Джо Гарднер — школьный учитель музыки, который мечтает выступать на сцене в составе джазового ансамбля. Однако, прежде чем его мечта успевает осуществиться, несчастный случай разделяет его душу и тело. Джо должен найти способ вернуться в своё тело, работая с молодой душой, которая ещё только учится жить.",
      trailerUrl: "https://vk.com/video-94515804_456239269?ysclid=ma4bqkk6xl847464040",
      videoSource: "vk",
    },
  ]
  
  // Функция для преобразования URL видео в формат для встраивания
  function getEmbedUrl(url, source) {
    if (!url) return null
  
    // Обработка YouTube URL
    if (source === "youtube" || url.includes("youtube.com") || url.includes("youtu.be")) {
      // Если URL уже в формате embed, используем его
      if (url.includes("/embed/")) {
        return url + (url.includes("?") ? "&autoplay=1" : "?autoplay=1")
      }
  
      // Извлекаем ID видео из YouTube URL
      let videoId = ""
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]
      } else if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0]
      }
  
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`
      }
    }
  
    // Обработка VK URL
    if (source === "vk" || url.includes("vk.com/video")) {
      // Регулярное выражение для извлечения ID владельца и ID видео из VK URL
      const vkRegex = /vk\.com\/video(-?\d+)_(\d+)/
      const match = url.match(vkRegex)
  
      if (match && match.length >= 3) {
        const ownerId = match[1]
        const videoId = match[2]
        return `https://vk.com/video_ext.php?oid=${ownerId}&id=${videoId}&hd=1&autoplay=1`
      }
    }
  
    // Если не удалось обработать URL, возвращаем исходный
    return url
  }
  
  // Функция для отображения информации о фильме
  function displayMovieInfo(movie) {
    const movieInfoContainer = document.getElementById("movie-info")
  
    // Создаем HTML для информации о фильме
    const movieHTML = `
          <div class="movie-content">
              <div class="movie-poster">
                  <img src="${movie.poster}" alt="Постер фильма ${movie.title}">
              </div>
              <div class="movie-details">
                  <h2 class="movie-title">${movie.title}</h2>
                  
                  <div class="movie-info-list">
                      <div class="movie-info-item">
                          <span class="movie-info-label">Жанр:</span>
                          <span>${movie.genre || "—"}</span>
                      </div>
                      <div class="movie-info-item">
                          <span class="movie-info-label">Режиссер:</span>
                          <span>${movie.director || "—"}</span>
                      </div>
                      <div class="movie-info-item">
                          <span class="movie-info-label">В ролях:</span>
                          <span>${movie.cast || "—"}</span>
                      </div>
                      <div class="movie-info-item">
                          <span class="movie-info-label">Возраст:</span>
                          <span>${movie.ageRating || "—"}</span>
                      </div>
                      <div class="movie-info-item">
                          <span class="movie-info-label">Длительность:</span>
                          <span>${movie.duration || "—"}</span>
                      </div>
                  </div>
                  
                  <button class="buy-ticket-btn">КУПИТЬ БИЛЕТ</button>
                  
                  <div class="movie-description-container">
                      <h3 class="movie-description-title">Описание</h3>
                      <p class="movie-description">${movie.description}</p>
                  </div>
              </div>
          </div>
          
          <div class="trailer-section">
              <h3 class="trailer-title">Трейлер</h3>
              <div class="trailer-container">
                  <div class="trailer-placeholder" id="trailer-placeholder" data-source="${movie.videoSource || "youtube"}" data-url="${movie.trailerUrl}">
                      <div class="play-button">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                      </div>
                      <img src="${movie.poster}" alt="Трейлер фильма ${movie.title}">
                  </div>
              </div>
          </div>
      `
  
    // Вставляем HTML в контейнер
    movieInfoContainer.innerHTML = movieHTML
  
    // Добавляем обработчик события для воспроизведения трейлера
    const trailerPlaceholder = document.getElementById("trailer-placeholder")
    trailerPlaceholder.addEventListener("click", function () {
      const trailerContainer = this.parentElement
      const videoUrl = this.getAttribute("data-url")
      const videoSource = this.getAttribute("data-source")
  
      // Получаем URL для встраивания
      const embedUrl = getEmbedUrl(videoUrl, videoSource)
  
      if (!embedUrl) {
        console.error("Не удалось получить URL для встраивания видео")
        return
      }
  
      this.remove()
  
      const iframe = document.createElement("iframe")
      iframe.src = embedUrl
      iframe.title = `Трейлер фильма`
      iframe.frameBorder = "0"
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.allowFullscreen = true
      iframe.className = "trailer-iframe"
  
      trailerContainer.appendChild(iframe)
    })
  }
  
  // Выбираем случайный фильм при загрузке страницы
  document.addEventListener("DOMContentLoaded", () => {
    const randomIndex = Math.floor(Math.random() * movies.length)
    const randomMovie = movies[randomIndex]
    displayMovieInfo(randomMovie)
  })
  