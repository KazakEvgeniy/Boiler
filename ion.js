//аккордеон

document.querySelectorAll('.repair-item').forEach(item =>
	item.addEventListener('click', () => {
		item.classList.toggle('item--active');
	})
);

//открытие модального окна 
let buttonOrder = document.querySelector('button.btn');
let form = document.querySelector('div.form');
let closeForm = document.querySelector('span.form-header__close');
const wrapperForm = document.querySelector('.wrapper-form');

function openModal() {
	buttonOrder.addEventListener('click', () => {
		form.style.display = 'flex';
		document.body.style.overflow = 'hidden';
		menuActive.classList.remove('menu__list--active');
		wrapperForm.style.display = 'block';

	});
}

openModal();

// закрытие модального окна по клику на крестик
function closeModal() {
	form.style.display = 'none';
	document.body.style.overflow = '';
	wrapperForm.style.display = 'none';
}


closeForm.addEventListener('click', closeModal);

wrapperForm.addEventListener('click', (e) => {
	if (e.target == wrapperForm) {
		closeModal();
	}
});



//slider

let mySlider1 = new Swiper('.brands-slider1-container', {
	navigation: {
		prevEl: '.swiper-button-prev',
		nextEl: '.swiper-button-next',
	},

	breakpoints: {

		320: {
			slidesPerView: 1,
			spaceBetween: 5
		},
		420: {
			slidesPerView: 1,
			spaceBetween: 5
		},

		480: {
			slidesPerView: 2,
			spaceBetween: 30
		},

		620: {
			slidesPerView: 3,
			spaceBetween: 40
		}
	},


	simulateTouch: true,
	touchRaion: 1,
	touchAngle: 45,
	grabCursor: true,
	slideToClickedSlide: true,
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},

	slidesPerView: 3,
	loop: true,
	autoplay: {
		delay: 2000,
		// stopOnLastSlide: false,
		disableOnInteraction: false,
	},
	speed: 1400,
	prealoadImages: false,
	lazy: {
		loadOnTransitionStart: false,
		loadPrevNext: true,
	},
});

let sliderBlock = document.querySelector('.brands-slider1-container');
// console.log(sliderBlock);
sliderBlock.addEventListener('mouseenter', function (e) {
	mySlider1.autoplay.stop();
});
sliderBlock.addEventListener('mouseleave', function (e) {
	mySlider1.params.autoplay.disableOnInteraction = false;
	mySlider1.params.autoplay.delay = 5000;
	mySlider1.autoplay.start();
});

//форма
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		formData.append('image', formImage.filea[0]);

		if (error === 0) {
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = '';
				form.reset();
			} else {
				alert("Ошибка")
			}
			alert('заполните обязательное поле')
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);
			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	//получаем инпут file в переменную
	const formImage = document.getElementById('formImage');
	//получаем див для превью
	const formPreview = document.getElementById('formPreview');

	//слушаем изменения в инпуте file
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});

	function uploadFile(file) {
		//проверяем тип файла
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('Разрешены только избражения.');
			formImage.value = '';
			return;
		}
		//проверяем размер файла (<3 Мb)
		if (file.size > 5 * 4000 * 3000) {
			alert('Файл должен быть не более 5Мb');
			return;
		}

		//загружаем фото в превью
		var reader = new FileReader();
		reader.onload = function (e) {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
		};
		reader.onerror = function (e) {
			alert('Ошибка');
		};
		reader.readAsDataURL(file);
	}
})

// menu__btn

const btn = document.querySelector('.menu__btn'),
	menuActive = document.querySelector('.panel-control');

btn.addEventListener('click', (e) => {
	menuActive.classList.toggle('menu__list--active');
	closeModal();

});




//скрытие меню при скролле

function closeMenuOnScroll() {
	window.addEventListener('scroll', () => {
		let scroll = window.pageYOffset;
		if (scroll && menuActive.classList.contains('menu__list--active')) {
			menuActive.classList.remove('menu__list--active');
		}
	});
}

closeMenuOnScroll();


