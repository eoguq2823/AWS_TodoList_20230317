class InformationEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new InformationEvent();
        }
        return this.#instance;
    }

    addEventPhotoChangeClick() {
        const infoPhoto = document.querySelector(".info-photo");
        infoPhoto.onclick = () => {
            const photoFile = document.querySelector(".photo-file");
            photoFile.click();
        }
    }

    addEventPhotoChange() {
        const photoFile = document.querySelector(".photo-file");
        photoFile.onchange = () => {
            FileService.getInstance().changePhoto();
        }
    }
    addEventAboutMeModifyClick() {
        const aboutMeModifyButton = document.querySelector(".m-aboutme");
        aboutMeModifyButton.onclick = () => {
            const aboutMeSaveButton = document.querySelector(".s-aboutme");
            aboutMeSaveButton.classList.remove("button-hidden");
            aboutMeModifyButton.classList.add("button-hidden");

            const infoInputContainers = document.querySelectorAll(".info-input-container");
            infoInputContainers.forEach(infoInputContainer => {
                infoInputContainer.querySelector(".info-input").disabled = false;
            });
        }
    }
    addEventAboutMeSaveClick() {
        const aboutMeSaveButton = document.querySelector(".s-aboutme");
        aboutMeSaveButton.onclick = () => {
            const aboutMeModifyButton = document.querySelector(".m-aboutme");
            aboutMeModifyButton.classList.remove("button-hidden");
            aboutMeSaveButton.classList.add("button-hidden");

            const infoInputContainers = document.querySelectorAll(".info-input-container");

            //유저 인포메이션 작성한거 유지 2번
            const userInfo = InformationService.getInstance().userInfo;
            infoInputContainers.forEach(infoInputContainer => {
                const infoInput = infoInputContainer.querySelector(".info-input");
                infoInput.disabled = true;
                userInfo[infoInput.id] = infoInput.value;

                // console.log(infoInputContainer.querySelector(".info-input").value);
                // infoInputContainer.querySelector(".info-input").disabled = true;
            });

            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
    }

    addEventIntroduceModifyClick() {
        const introduceModifyButton = document.querySelector(".m-introduce");
        introduceModifyButton.onclick = () => {
            const introduceSaveButton = document.querySelector(".s-introduce");
            introduceSaveButton.classList.remove("button-hidden");
            introduceModifyButton.classList.add("button-hidden");
            const introduceInput = document.querySelector(".introduce-input")
            introduceInput.disabled = false;
        }
    }
    addEventIntroduceSaveClick() {
        const introduceSaveButton = document.querySelector(".s-introduce");
        introduceSaveButton.onclick = () => {
            const introduceModifyButton = document.querySelector(".m-introduce");
            introduceModifyButton.classList.remove("button-hidden");
            introduceSaveButton.classList.add("button-hidden");
            const introduceInput = document.querySelector(".introduce-input")
            introduceInput.disabled = true;
             //유저 인포메이션 작성한거 유지 3번
            const userInfo = InformationService.getInstance().userInfo;
            userInfo["introduce"] = introduceInput.value;
            
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
    }
}

class InformationService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new InformationService();
        }
        return this.#instance;
    }

    //유저 인포메이션 작성한거 유지 1번
    userInfo = {};



    loadInfo() {
        this.loadinfoPhoto();
    //유저 인포메이션 작성한거 유지 5번
        this.loadinfoUser();
    }

    loadinfoPhoto() {
        const infoPhotoImg = document.querySelector(".info-photo img");
        const infoPhoto = localStorage.getItem("infoPhoto");
        if(infoPhoto == null) {
            infoPhotoImg.src = "./images/images2.jfif";
        } else {
            infoPhotoImg.src = infoPhoto;
        }
    }
    //유저 인포메이션 작성한거 유지 4번
    loadinfoUser() {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(this.userInfo == null) {
            this.userInfo = {};
            return; //null이 아닐때만 동작하게
        }
        Object.keys(this.userInfo).forEach(key => {
            const infoInput = document.querySelectorAll(".info-input");
            infoInput.forEach(input => {
                if(input.id == key) {
                    input.value = this.userInfo[key];
                }
            });
        });
        if(typeof this.userInfo.introduce =="undefined") {
            return;
        }
        const introduceInput = document.querySelector(".introduce-input");
        introduceInput.value = this.userInfo.introduce
    }
}


class FileService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new FileService();
        }
        return this.#instance;
    }

    changePhoto() {
        const photoForm = document.querySelector(".photo-form");
        const formData = new FormData(photoForm);
        const fileValue = formData.get("file");
        let changeFleg = true; //무조건참일수있게 
        if(fileValue.size == 0) { //취소를눌렀을때
            return;
        }
        this.showPreview(fileValue);
    }

    showPreview(fileValue) {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(fileValue);

        fileReader.onload = (e) => {
            const photoImg = document.querySelector(".info-photo img");
            photoImg.src = e.target.result;
            //로컬스터리지에 파일(사진) 저장
            localStorage.setItem("infoPhoto", potoImg.src); //(키값, )
        }

    }
    
}