'use strict';

/*
Gallery - Code by Zsolt Király
v1.2.2 - 2018-04-01
*/

var galleryWithThumbnail = function() {

    function windowWidth() {
        var windowWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 200;
        return windowWidth;
    }

    function clearPlayForward(arrow) {
        var topFunction = arrow.nextElementSibling;
        autoPlayButton = arrow.nextElementSibling.querySelector('.auto-play-icon');

        topFunction.classList.add('display-none');
        autoPlayButton.classList.remove('play');
        autoPlayButton.classList.add('pause');
        autoPlayButton.innerHTML = '<span>Play / Pause</span><i class="fa fa-play-circle" aria-hidden="true"></i>';
    }

    function resizThumbWidth(config) {
        if (config.thumbShow == true) {
            var thumbBoxWidth = document.querySelector('section.img-container .thumb-container .thumb-box');

            thumbBoxWidth.setAttribute('style', 'max-width:' + windowWidth() + 'px;');
        }
    }

    function close(bg, img, arrow, pS) {
        document.body.classList.remove('overflow-hidden');
        bg.classList.remove('show');
        img.classList.remove('show');
        arrow.classList.remove('show');
        pS.classList.remove('show');
        img.removeAttribute('style');
        img.querySelector('menu.top-function').classList.add('display-none');

        var thumbLeft = img.querySelector('.thumb-left');
        var thumbRight = img.querySelector('.thumb-right');

        if(thumbLeft && thumbRight) {
            thumbLeft.classList.remove('in-active');
            thumbRight.classList.remove('in-active');
        }

        arrow.firstElementChild.classList.remove('in-active');
        arrow.lastElementChild.classList.remove('in-active');
    }

    function marginReset(tBC, tL, tR) {
        var thumbBoxContainer = document.querySelector('.thumb-content .thumb-box .container');
        thumbBoxContainer.setAttribute('style', 'margin-left:0px;');
        addThumbArrowLeftInActive(tL, tR);
    }

    function removeThumbArrowInActive(tL, tR) {
        tL.classList.remove('in-active');
        tR.classList.remove('in-active');
    }

    function addThumbArrowLeftInActive(tL, tR) {
        tL.classList.add('in-active');
        tR.classList.remove('in-active');
    }

    function addThumbArrowRightInActive(tL, tR) {
        tL.classList.remove('in-active');
        tR.classList.add('in-active');
    }

    function fullScreen() {
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {

            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();

            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();

            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }

        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();

            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();

            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    function clickDisabled(imageContainer) {
        imageContainer.classList.add('disabled');

        setTimeout(function() {
            imageContainer.classList.remove('disabled');
        }, 300);
    }

    function gallery(imgCs, oy, aC, imgC, lg, c) {
        var i = 0,
            len = imgCs.length;
        for (var i = 0; i < len; i++) {
            var imgContent = imgCs[i],
                thumbImg = imgContent.firstElementChild;

            imgContent.setAttribute('data-id', i + 1);

            imgContent.addEventListener('click', function(event) {

                document.body.classList.add('overflow-hidden');

                var obj = this,
                    imgSrc = obj.getAttribute('data-src'),
                    imgId = obj.getAttribute('data-id');

                var thumbLeft = document.querySelector('.thumb-content .thumb-left'),
                    thumbRight = document.querySelector('.thumb-content .thumb-right');

                if (c.continued == false) {
                    if (obj == imgCs[0]) {
                        aC.firstElementChild.classList.add('in-active');

                    } else if (obj == imgCs[imgCs.length - 1]) {
                        aC.lastElementChild.classList.add('in-active');
                    }
                }

                if (c.thumbShow == true) {
                    if (obj == imgCs[0]) {
                        thumbLeft.classList.add('in-active');
                    }
                }

                oy.classList.add('show');
                aC.classList.add('show');
                obj.classList.add('show');

                clickDisabled(imgC);

                imgC.classList.add('show');

                var img = imgC.querySelector('.img');

                img.setAttribute('src', imgSrc);
                img.setAttribute('data-id', imgId);

                if (c.loadingShow == true) {
                    lg.classList.remove('display-none');

                    setTimeout(function() {
                        lg.classList.remove('hide');
                    }, 50);

                    img.addEventListener('load', function() {
                        setTimeout(function() {
                            lg.classList.add('hide');
                        }, 100);

                        setTimeout(function() {
                            lg.classList.add('display-none');
                        }, 300);

                    }, false);
                }

                if (c.thumbShow == true) {
                    img.addEventListener('load', function() {
                        resizThumbWidth(c);

                        window.addEventListener('resize', function() {
                            resizThumbWidth(c);
                        }, false);

                    }, false);

                    var thumbBoxContainer = document.querySelector('.thumb-content .thumb-box .container');
                    var thumbDistance = ((imgId * 100) + (imgId * 15) - 115);

                    if (imgId == 1) {
                        thumbBoxContainer.setAttribute('style', 'margin-left:0px');

                    } else {

                        var imgLineWidth = (i * (100 + 15)) - 15,
                            maxWidth = imgLineWidth - windowWidth();

                        if (maxWidth > thumbDistance) {
                            thumbBoxContainer.setAttribute('style', 'margin-left:-' + thumbDistance + 'px');

                        } else {

                            addThumbArrowRightInActive(thumbLeft, thumbRight);

                            if (imgLineWidth > windowWidth()) {
                                thumbBoxContainer.setAttribute('style', 'margin-left:-' + maxWidth + 'px');
                            }
                        }
                    }
                }

                var thumbList = document.querySelectorAll('.thumb-container .thumb-img');
                var t = 0,
                    thumbElements = thumbList.length;
                for (; t < thumbElements; t++) {
                    var thumbElement = thumbList[t];

                    if (imgId == thumbElement.getAttribute('data-id')) {
                        thumbElement.classList.add('active');
                    }

                }
                var autoPlayButton = document.querySelector('menu.top-function');

                autoPlayButton.classList.remove('display-none');

                var fullScreenButton = document.querySelector('.full-screen-icon');

                fullScreenButton.addEventListener("click", function() {
                    fullScreen();
                }, false);

            }, false);
        }
        resizThumbWidth(c);
    }

    var playForward;

    function closeB(closeB, oy, aC, imgC, c) {
        if (c.closeX == true) {

            function closeFunction(closeB, oy, aC, imgC, c) {
                var pictureShow = document.querySelector('.picture.show');

                close(oy, imgC, aC, pictureShow);
                imgC.querySelector('.img').removeAttribute('src'),
                    imgC.querySelector('.img').removeAttribute('data-id');

                thumbRemoveActive(c);
                clearInterval(playForward);
                clearPlayForward(aC);
            };

            closeB.addEventListener('click', function() {
                closeFunction(closeB, oy, aC, imgC, c);
            }, false);

        } else {
            closeB.classList.add('hide');
        }
    }

    function lastShow(first, last) {
        first.classList.remove('show');
        last.classList.add('show');
    }

    function firstShow(first, last) {
        first.classList.add('show');
        last.classList.remove('show');
    }

    function navigation(direction, w, confContinued, confLoading) {
        var showImg = document.querySelector('section.img-container'),
            loading = document.querySelector('.loading'),
            img = showImg.querySelector('.img'),
            close = showImg.querySelector('.close'),
            imgGetSrc = img.getAttribute('src');

        if (confLoading == true) {
            loading.classList.remove('display-none');

            setTimeout(function() {
                loading.classList.remove('hide');
            }, 50);
        }

        if (direction !== null || direction != undefined) {
            var imgAttr = direction.getAttribute('data-src'),
                imgId = direction.getAttribute('data-id');

            img.setAttribute('src', imgAttr);
            img.setAttribute('data-id', imgId);

            var imageGetId = img.getAttribute('data-id'),
                pictures = document.querySelectorAll('.picture');

            var i = 0,
                lenPictures = pictures.length;
            for (; i < lenPictures; i++) {
                var picture = pictures[i],
                    pictureId = picture.getAttribute('data-id');

                if (imageGetId == pictureId) {
                    picture.classList.add('show');

                } else {

                    picture.classList.remove('show');
                }
            }

        } else {
            if (confContinued == true) {
                var galleryContainer = document.querySelector('.img-gallery'),
                    firstPicture = galleryContainer.firstElementChild,
                    lastPicture = galleryContainer.lastElementChild;

                if (w == 'prev') {
                    lastShow(firstPicture, lastPicture);
                }

                if (w == 'next') {
                    firstShow(firstPicture, lastPicture);
                }

                var imgShow = document.querySelector('.picture.show'),
                    setPictureAttribute = imgShow.getAttribute('data-src');

                img.setAttribute('src', setPictureAttribute);

            } else {
                loading.classList.add('display-none');
                img.classList.remove('opacity-hide');
                close.classList.remove('opacity-hide');
            }
        }

        if (confLoading == true) {
            img.addEventListener('load', function() {
                setTimeout(function() {
                    loading.classList.add('hide');
                }, 100);

                setTimeout(function() {
                    loading.classList.add('display-none');
                }, 300);

            }, false);
        }
    }

    function opacityPicture() {
        var showImg = document.querySelector('section.img-container'),
            img = showImg.querySelector('.img'),
            close = showImg.querySelector('.close');

        img.classList.add('opacity-hide');
        close.classList.add('opacity-hide');

        img.addEventListener('load', function() {
            setTimeout(function() {
                close.classList.remove('opacity-hide');
                img.classList.remove('opacity-hide');
            }, 100);
        }, false);
    }

    function ifOpacityPrev(cC, iCs) {
        if (cC == false) {
            var active = document.querySelector('.img-gallery .picture.show');
            var first = iCs[0];

            if (active != first) {
                opacityPicture();
            }

        } else {
            opacityPicture();
        }
    }

    function ifOpacityNext(cC, iCs) {
        if (cC == false) {
            var active = document.querySelector('.img-gallery .picture.show');
            var last = iCs[iCs.length - 1];

            if (active != last) {
                opacityPicture();
            }

        } else {
            opacityPicture();
        }
    }

    function choose(imgCs, aC, c) {
        var confContinued = c.continued,
            confLoading = c.loadingShow;

        var prevContainer = aC.firstElementChild,
            nextContainer = aC.lastElementChild;

        var prev = prevContainer.firstElementChild,
            next = nextContainer.firstElementChild;

        var thumbBox = document.querySelector('.thumb-content .thumb-box');

        function previousPicture(windowWidth) {
            var imgShow = document.querySelector('.picture.show'),
                showImgContainer = document.querySelector('section.img-container.show'),
                thumbLeft = document.querySelector('.thumb-content .thumb-left'),
                thumbRight = document.querySelector('.thumb-content .thumb-right');

            if (showImgContainer) {
                var previousImg = imgShow.previousElementSibling;
                var way = 'prev';

                if (confContinued == false) {
                    if (imgCs[0] == previousImg) {
                        aC.firstElementChild.classList.add('in-active');

                    } else if (imgCs[imgCs.length - 2] == previousImg) {
                        aC.lastElementChild.classList.remove('in-active');
                    }
                }

                clickDisabled(showImgContainer);

                setTimeout(function() {
                    navigation(previousImg, way, confContinued, confLoading);
                }, 300);

                if (c.thumbShow == true) {
                    var thumbList = document.querySelectorAll('.thumb-container .thumb-img');
                    var i = 0,
                        thumbPrevious = thumbList.length;
                    for (; i < thumbPrevious; i++) {
                        var thumbPreviousElement = thumbList[i];

                        var thumbMaxWidth = ((thumbPrevious * 100) + (thumbPrevious * 15) - 15),
                            maxWidth = thumbMaxWidth - windowWidth;

                        var thumbBoxContainer = document.querySelector('.thumb-content .thumb-box .container');

                        if (previousImg != null || previousImg != undefined) {
                            if (previousImg.getAttribute('data-id') == thumbPreviousElement.getAttribute('data-id')) {

                                var getPreviousId = thumbPreviousElement.getAttribute('data-id'),
                                    thumbDistance = ((getPreviousId * 100) + (getPreviousId * 15) - 115);

                                if (thumbDistance <= maxWidth) {
                                    thumbBoxContainer.setAttribute('style', 'margin-left:-' + thumbDistance + 'px');

                                    removeThumbArrowInActive(thumbLeft, thumbRight);

                                    if ((parseFloat(thumbBoxContainer.style.marginLeft, 10) * -1) == 0) {

                                        addThumbArrowLeftInActive(thumbLeft, thumbRight);
                                    }

                                } else {
                                    addThumbArrowRightInActive(thumbLeft, thumbRight);
                                }
                                thumbPreviousElement.classList.add('active');

                            } else {
                                thumbPreviousElement.classList.remove('active');
                            }
                        } else {
                            if (confContinued == true) {

                                var thumbBoxContainer = document.querySelector('.thumb-content .thumb-box .container');

                                if (maxWidth > thumbMaxWidth) {
                                    thumbBoxContainer.setAttribute('style', 'margin-left:-' + thumbMaxWidth + 'px');
                                } else {

                                    if (thumbMaxWidth > windowWidth) {
                                        thumbBoxContainer.setAttribute('style', 'margin-left:-' + maxWidth + 'px');
                                    }

                                    var thumbListFirst = thumbList[0],
                                        thumbListLast = thumbList[thumbList.length - 1];

                                    addThumbArrowRightInActive(thumbLeft, thumbRight);

                                    thumbListLast.classList.add('active');
                                    thumbListFirst.classList.remove('active');
                                }
                            }
                        }
                    }
                }
            }
        }

        function prevStep() {
            if (c.thumbShow == true) {
                var windowWidth = parseFloat(thumbBox.style.maxWidth, 10);
            }

            previousPicture(windowWidth);
            ifOpacityPrev(confContinued, imgCs, aC);
        }

        function prevImage(e) {
            if (confContinued == false) {
                var active = document.querySelector('.img-gallery .picture.show');
                var first = imgCs[0];

                if (active == first) {
                    e.preventDefault();
                } else {
                    prevStep();
                }
            } else {
                prevStep();
            }
        }

        prev.addEventListener('click', function(e) {
            prevImage(e);
        }, false);

        document.addEventListener('keydown', function(e) {
            if (event.keyCode == 37) {
                prevImage(e);
            }
        }, false);

        function nextPicture(windowWidth) {
            var imgShow = document.querySelector('.picture.show'),
                showImgContainer = document.querySelector('section.img-container.show'),
                thumbLeft = document.querySelector('.thumb-content .thumb-left'),
                thumbRight = document.querySelector('.thumb-content .thumb-right');

            if (showImgContainer) {
                var nextImg = imgShow.nextElementSibling;
                var way = 'next';

                if (confContinued == false) {
                    if (imgCs[1] == nextImg) {
                        aC.firstElementChild.classList.remove('in-active');

                    } else if (imgCs[imgCs.length - 1] == nextImg) {
                        aC.lastElementChild.classList.add('in-active');
                    }
                }

                clickDisabled(showImgContainer);

                setTimeout(function() {
                    navigation(nextImg, way, confContinued, confLoading);
                }, 300);

                if (c.thumbShow == true) {
                    var thumbList = document.querySelectorAll('.thumb-container .thumb-img');
                    var i = 0,
                        thumbNext = thumbList.length,
                        imgLineWidth = (thumbList.length * (100 + 15)) - 15;

                    for (; i < thumbNext; i++) {
                        var thumbNextElement = thumbList[i];

                        var thumbMaxWidth = ((thumbNext * 100) + (thumbNext * 15) + 115),
                            maxWidth = thumbMaxWidth - windowWidth;

                        var thumbBoxContainer = document.querySelector('.thumb-content .thumb-box .container');

                        if (nextImg != null || nextImg != undefined) {
                            if (nextImg.getAttribute('data-id') == thumbNextElement.getAttribute('data-id')) {

                                var getNextId = thumbNextElement.getAttribute('data-id'),
                                    thumbDistance = ((getNextId - 1) * 100) + ((getNextId - 1) * 15);

                                if (thumbDistance <= (imgLineWidth - windowWidth)) {
                                    thumbBoxContainer.setAttribute('style', 'margin-left:-' + thumbDistance + 'px');

                                    removeThumbArrowInActive(thumbLeft, thumbRight);

                                } else {
                                    var lastDistance = imgLineWidth - (thumbDistance - 115 + windowWidth),
                                        actialDistance = parseFloat(thumbBoxContainer.style.marginLeft, 10),
                                        lastDistanceNeg = lastDistance * -1;

                                    if ((imgLineWidth - windowWidth) <= (lastDistance + (actialDistance * -1))) {
                                        if (imgLineWidth > windowWidth) {

                                            thumbBoxContainer.setAttribute('style', 'margin-left:' + (actialDistance + lastDistanceNeg) + 'px');

                                            addThumbArrowRightInActive(thumbLeft, thumbRight);
                                        }

                                    } else {
                                        var lastThumbDistance = imgLineWidth - windowWidth;

                                        if (thumbMaxWidth > windowWidth) {
                                            thumbBoxContainer.setAttribute('style', 'margin-left:-' + lastThumbDistance + 'px');
                                        }

                                        addThumbArrowRightInActive(thumbLeft, thumbRight);
                                    }
                                }
                                thumbNextElement.classList.add('active');

                            } else {
                                thumbNextElement.classList.remove('active');
                            }

                        } else {
                            if (confContinued == true) {
                                var thumbListFirst = thumbList[0],
                                    thumbListLast = thumbList[thumbList.length - 1];

                                addThumbArrowLeftInActive(thumbLeft, thumbRight);

                                thumbListFirst.classList.add('active');
                                thumbListLast.classList.remove('active');

                                thumbBoxContainer.setAttribute('style', 'margin-left:0px');
                            }
                        }
                    }
                }
            }
        }

        function nextStep() {
            if (c.thumbShow == true) {
                var windowWidth = parseFloat(thumbBox.style.maxWidth, 10);
            }

            nextPicture(windowWidth);
            ifOpacityNext(confContinued, imgCs);
        }

        function nextImage(e) {
            if (confContinued == false) {
            var active = document.querySelector('.img-gallery .picture.show');
                var last = imgCs[imgCs.length - 1];

                if (active == last) {
                    e.preventDefault();
                } else {
                    nextStep();
                }
            } else {
                nextStep();
            }
        }

        next.addEventListener('click', function(e) {
            nextImage(e);
        }, false);

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 39) {
                nextImage(e);
            }
        }, false);

        var imgBox = document.querySelector('.img-box');
        var startx = 0;
        var dist = 0;

        if (imgBox) {

            imgBox.addEventListener('touchstart', function(e) {
                var touchobj = e.changedTouches[0];
                startx = parseInt(touchobj.clientX);
            }, false);


            imgBox.addEventListener('touchend', function(e) {

                var touchobj = e.changedTouches[0];
                var dist = parseInt(touchobj.clientX) - startx;

                if (dist > 50) {
                    prevImage(e);

                } else if (dist < -50) {
                    nextImage(e);
                }

            }, false);
        }

        function play() {

            if (c.thumbShow == true) {
                var windowWidth = parseFloat(thumbBox.style.maxWidth, 10);
            }

            nextPicture(windowWidth);
            ifOpacityNext(confContinued, imgCs);
        }

        var autoPlayButton = document.querySelector('.auto-play-icon');

        autoPlayButton.addEventListener('click', function() {

            if (autoPlayButton.classList.contains('pause')) {
                autoPlayButton.classList.add('play');
                autoPlayButton.classList.remove('pause');

                playForward = setInterval(function() {
                    play();
                }, c.playTime);

                autoPlayButton.innerHTML = '<span>Play / Pause</span><i class="fa fa-pause-circle" aria-hidden="true"></i>';

            } else {
                autoPlayButton.classList.remove('play');
                autoPlayButton.classList.add('pause');
                clearInterval(playForward);
                autoPlayButton.innerHTML = '<span>Play / Pause</span><i class="fa fa-play-circle" aria-hidden="true"></i>';
            }

        }, false);

    }

    function closeNeutral(oy, aC, c) {
        window.addEventListener('click', function(event) {
            var imgShow = document.querySelector('section.img-container.show'),
                pictureShow = document.querySelector('.picture.show');

            var left = aC.firstElementChild,
                right = aC.lastElementChild;

            if (c.closeNeutral == true) {
                if (event.target == aC) {
                    imgShow.querySelector('.img').removeAttribute('src');
                    imgShow.querySelector('.img').removeAttribute('data-id');
                    close(oy, imgShow, aC, pictureShow);
                    thumbRemoveActive(c);
                    clearInterval(playForward);
                    clearPlayForward(aC);
                }
            }
        }, false);
    }

    function closeEsc(oy, aC, c) {
        document.addEventListener('keydown', function(event) {
            var esc = document.querySelector('section.img-container.show'),
                pictureShowEsc = document.querySelector('.picture.show');
            if (c.closeEsc == true) {
                if (event.keyCode == 27) {
                    if (esc) {
                        esc.querySelector('.img').removeAttribute('src');
                        esc.querySelector('.img').removeAttribute('data-id');
                        close(oy, esc, aC, pictureShowEsc);
                        thumbRemoveActive(c);
                        clearInterval(playForward);
                        clearPlayForward(aC);
                    }
                }
            }
        }, false);
    }

    function thumb(imgCs, tB) {
        var stop = 0;
        while (stop < imgCs.length) {
            tB.innerHTML += '<div data-src="" class="thumb-img"><img src="" alt=""></div>';
            stop++;
        };

        var thumbList = document.querySelectorAll('.thumb-container .thumb-img');

        var thumbArray = [],
            i = 0,
            lenThumbList = thumbList.length;
        for (; i < lenThumbList; i++) {
            var thumbPictures = thumbList[i];
            thumbArray.push(thumbPictures);
        }

        var i = 0,
            lenFront = imgCs.length;
        for (; i < lenFront && thumbArray; i++) {
            var imgFrontContent = imgCs[i],
                thumbImageDiv = thumbArray[i],
                thumbImage = thumbImageDiv.firstElementChild,
                frontImage = imgFrontContent.firstElementChild;

            var thumbDataSrc = imgFrontContent.getAttribute('data-src'),
                thumbDataId = imgFrontContent.getAttribute('data-id'),
                thumbImgAlt = frontImage.getAttribute('alt'),
                thumbImgSrc = frontImage.getAttribute('src');

            thumbImage.setAttribute('src', thumbImgSrc);
            thumbImage.setAttribute('alt', thumbImgAlt);
            thumbImageDiv.setAttribute('data-src', thumbDataSrc);
            thumbImageDiv.setAttribute('data-id', thumbDataId);
        }
    }

    function thumbChoose(imgCon, lg, imgCs, aC, c) {

        var thumbChooseImage = document.querySelectorAll('.thumb-content .thumb-box .thumb-img');
        var i = 0,
            lenThumbChoose = thumbChooseImage.length;
        for (; i < lenThumbChoose; i++) {
            var thumbDivChoose = thumbChooseImage[i],
                frontImages = imgCs[i];

            thumbDivChoose.addEventListener('click', function() {
                var objThumbChoose = this,
                    objThumbChooseGetSrc = objThumbChoose.getAttribute('data-src'),
                    objThumbChooseGetId = objThumbChoose.getAttribute('data-id'),
                    showImg = document.querySelector('section.img-container .img-box img');

                if (c.continued == false) {
                    if (objThumbChoose == thumbChooseImage[0]) {
                        aC.firstElementChild.classList.add('in-active');
                        aC.lastElementChild.classList.remove('in-active');

                    } else if (objThumbChoose == thumbChooseImage[thumbChooseImage.length - 1]) {
                        aC.lastElementChild.classList.add('in-active');
                        aC.firstElementChild.classList.remove('in-active');

                    } else {
                        aC.lastElementChild.classList.remove('in-active');
                        aC.firstElementChild.classList.remove('in-active');
                    }
                }

                clickDisabled(imgCon);

                var i = 0,
                    lenFrontImage = imgCs.length;
                for (; i < lenFrontImage && lenThumbChoose; i++) {
                    var frontImages = imgCs[i],
                        thumbImages = thumbChooseImage[i];

                    if (objThumbChoose.getAttribute('data-id') == frontImages.getAttribute('data-id')) {
                        frontImages.classList.add('show');

                    } else {
                        frontImages.classList.remove('show');
                    }

                    if (thumbImages.getAttribute('data-id') == objThumbChoose.getAttribute('data-id')) {
                        thumbImages.classList.add('active');

                    } else {
                        thumbImages.classList.remove('active');
                    }
                }

                if (c.loadingShow == true) {
                    lg.classList.remove('display-none');

                    setTimeout(function() {
                        lg.classList.remove('hide');
                    }, 50);
                }

                showImg.setAttribute('data-id', objThumbChooseGetId);

                setTimeout(function() {
                    showImg.setAttribute('src', objThumbChooseGetSrc);
                }, 300);

                opacityPicture();

                if (c.loadingSho == true) {
                    showImg.addEventListener('load', function() {

                        setTimeout(function() {
                            lg.classList.add('hide');
                        }, 100);

                        setTimeout(function() {
                            lg.classList.add('display-none');
                        }, 300);

                    }, false);
                }

            }, false);
        }
    }

    function thumbShowHide(c) {
        var thumbButton = document.querySelector('section.img-container .thumb-container .thumb-open-close');

        if (thumbButton) {
            thumbButton.addEventListener('click', function() {
                var thumbContent = document.querySelector('section.img-container.show .thumb-container .thumb-content');

                if (thumbContent.classList.contains('hide')) {
                    thumbButton.innerHTML = c.thumbHideText;
                    thumbContent.classList.remove('hide');

                    setTimeout(function() {
                        thumbContent.classList.add('show');
                    }, 50);

                } else {
                    thumbButton.innerHTML = c.thumbShowText;

                    setTimeout(function() {
                        thumbContent.classList.add('hide');
                    }, 300);
                    thumbContent.classList.remove('show');
                }
            }, false);

            if (c.thumbStart == 'show') {
                thumbButton.innerHTML = c.thumbHideText;
            }
        }
    }

    function thumbNavigation(imgCs) {
        var imageLength = imgCs.length,
            imgLineWidth = (imageLength * (100 + 15)) - 15,
            thumbLeft = document.querySelector('.thumb-content .thumb-left'),
            thumbBox = document.querySelector('.thumb-content .thumb-box'),
            thumbBoxContainer = document.querySelector('.thumb-content .thumb-box .container'),
            thumbRight = document.querySelector('.thumb-content .thumb-right');

        function navigationArrowShowHide() {
            if (windowWidth() > imgLineWidth) {
                thumbLeft.classList.add('display-none');
                thumbRight.classList.add('display-none');

            } else {
                thumbLeft.classList.remove('display-none');
                thumbRight.classList.remove('display-none');
            }
        }

        marginReset(thumbBoxContainer, thumbLeft, thumbRight);

        function leftMargin(e) {
            var getMarginLeft = parseFloat(thumbBoxContainer.style.marginLeft, 10);

            if (getMarginLeft == 0) {
                addThumbArrowLeftInActive(thumbLeft, thumbRight);

                e.preventDefault();

            } else {

                if ((getMarginLeft * -1) < windowWidth()) {

                    marginReset(thumbBoxContainer, thumbLeft, thumbRight);

                } else {
                    removeThumbArrowInActive(thumbLeft, thumbRight);

                    thumbBoxContainer.setAttribute('style', 'margin-left:' + (getMarginLeft + windowWidth()) + 'px;');

                    if ((getMarginLeft * -1) == parseFloat(thumbBox.style.maxWidth, 10)) {
                        addThumbArrowLeftInActive(thumbLeft, thumbRight);
                    }
                }
            }
        }

        function rightMargin(e) {
            var getMarginRight = parseFloat(thumbBoxContainer.style.marginLeft, 10);

            window.addEventListener('resize', function() {
                var getMarginRight = parseFloat(thumbBoxContainer.style.marginLeft, 10);
            }, false);

            if (imgLineWidth >= ((getMarginRight * -1) + windowWidth())) {
                if ((getMarginRight * -1) < (imgLineWidth - (windowWidth() * 2))) {
                    thumbBoxContainer.setAttribute('style', 'margin-left:' + (getMarginRight - windowWidth()) + 'px;');

                    removeThumbArrowInActive(thumbLeft, thumbRight);

                } else {
                    var rightDiff = ((getMarginRight - windowWidth()) + imgLineWidth) * -1;
                    thumbBoxContainer.setAttribute('style', 'margin-left:' + (getMarginRight + rightDiff) + 'px;');

                    addThumbArrowRightInActive(thumbLeft, thumbRight);

                    e.preventDefault();
                }
            }
        }

        navigationArrowShowHide();

        thumbLeft.addEventListener('click', function(e) {
            leftMargin(e);
        }, false);


        thumbRight.addEventListener('click', function(e) {
            rightMargin(e);
        }, false);


        window.addEventListener('resize', function() {
            navigationArrowShowHide();
        }, false);
    };

    function thumbRemoveActive(config) {
        if (config.thumbShow == true) {
            var thumbActives = document.querySelectorAll('.thumb-content .thumb-box .thumb-img');
            var i = 0,
                lenThumbActive = thumbActives.length;
            for (; i < lenThumbActive; i++) {
                var thumbActive = thumbActives[i];
                thumbActive.classList.remove('active');
            }
        }
    }

    function createDOMGallery() {
        var imgContent = document.createElement('SECTION');
        imgContent.setAttribute('class', 'img-container');
        document.body.insertBefore(imgContent, document.body.firstChild);

        imgContent.innerHTML = '<article class="img-box"><span class="close"><i class="fa fa-times" aria-hidden="true"></i></span><img class="img"></article><nav class="arrow-container"><div class="arrow-left"><i class="fa fa-chevron-left" aria-hidden="true"></i></div><div class="arrow-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></div></nav';
        
        var createOverlay = document.createElement('DIV');
        createOverlay.setAttribute('id', 'overlay');
        document.body.insertBefore(createOverlay, document.body.firstChild);
    }

    function createDOMLoading(c) {
        var loadingDiv = document.createElement('DIV');
        loadingDiv.setAttribute('class', 'loading hide display-none');
        document.body.insertBefore(loadingDiv, document.body.firstChild);
    }

    function createDOMThumbContainer(iC) {
        var createThumbContainer = document.createElement('DIV');
        createThumbContainer.setAttribute('class', 'thumb-container');
        iC.appendChild(createThumbContainer);

        createThumbContainer.innerHTML = '<div class="thumb-open-close">' + config.thumbShowText + '</div><div class="thumb-content ' + config.thumbStart + '"><div class="thumb-left"><i class="fa fa-chevron-left" aria-hidden="true"></i></div><div class="thumb-box"><div class="container"></div></div><div class="thumb-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></div></div>';
    }

    function createDOMTopFunctions(iC) {
        var createTopFunction = document.createElement('MENU');
        createTopFunction.setAttribute('class', 'top-function display-none');
        iC.appendChild(createTopFunction);

        createTopFunction.innerHTML =
        '<svg id="trapezoid" viewbox="0 0 100 40" preserveAspectRatio="none" width="100%">' +
            '<path d="M0,0 L100,0 L90,40 L10,40 L0,0" fill="#282c34" fill-opacity="1"></path>' +
        '</svg>' +
        '<div class="controll">' +
            '<span class="auto-play-icon pause">' +
                '<span>' + config.playOrPause + '</span>' +
                '<i class="fa fa-play-circle" aria-hidden="true"></i>' +
            '</span>' +
            '<span class="full-screen-icon">' +
                '<span>' + config.fullScreenText + '</span>' +
                '<i class="fa fa-expand-arrows-alt" aria-hidden="true"></i>' +
            '</span>' +
        '</div>';
    }

    function app(config) {

        createDOMGallery();

        var imgContents = document.querySelectorAll('.picture'),
            overlay = document.querySelector('#overlay'),
            imgContainer = document.querySelector('section.img-container'),
            closeButton = imgContainer.querySelector('.close'),
            arrowContainer = document.querySelector('nav.arrow-container'),
            overlay = document.querySelector('#overlay');

        createDOMTopFunctions(imgContainer);

        if (config.loadingShow == true) {
            createDOMLoading();

            var loading = document.querySelector('.loading');
        }

        if (config.thumbShow == true) {
            createDOMThumbContainer(imgContainer);

            var thumbBox = document.querySelector('.thumb-container .thumb-box .container');
        }

        gallery(imgContents, overlay, arrowContainer, imgContainer, loading, config);
        closeNeutral(overlay, arrowContainer, config);
        closeB(closeButton, overlay, arrowContainer, imgContainer, config);
        closeEsc(overlay, arrowContainer, config);
        choose(imgContents, arrowContainer, config);

        if (config.thumbShow == true) {
            thumb(imgContents, thumbBox);
            thumbShowHide(config);
            thumbChoose(imgContainer, loading, imgContents, arrowContainer, config);
            thumbNavigation(imgContents);
        }
    }

    return {
        app: app
    }

}();