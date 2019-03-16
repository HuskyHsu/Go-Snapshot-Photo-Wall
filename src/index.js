import * as data from './data';
import pmList from './pmlist';
import './style.css';
import './modal.css';

const photos_dom = document.getElementById('photos');

const asyncRun = async () => {
    const d = await data.get();
    if (d.success) {
        for (let photo of d.data) {
            // console.log(photo.link);
            let div = document.createElement('div');
            let img = document.createElement('img');
            let p = document.createElement('p');

            let photo_info = photo.description.split('-');
            img.src = photo.link;
            p.innerHTML = `${photo.title} <span>by ${photo_info[2]}</span>`;
            div.append(img);
            div.append(p);
            div.dataset.pmid = photo_info[0];
            div.dataset.pm = photo_info[1];
            photos_dom.append(div);
        }
    }
};

asyncRun();

var modal = document.getElementById('add_modal');

document.getElementById("upload").onclick = function () {
    modal.style.display = "block";
}

document.querySelector("#add_modal .close").onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// 挑選主角名稱
let input = document.getElementById("pm_name");
let pm_meets = document.getElementById("pm_meets");

input.onkeyup = () => {
    while (pm_meets.hasChildNodes()) {
        pm_meets.removeChild(pm_meets.firstChild);
    }

    const pm = input.value;
    if (pm == "") {
        return 0
    }

    pmList.filter(row => {
        const showText = `${row[0]}-${row[1]}`;
        return showText.indexOf(pm) > -1
    }).forEach(row => {
        let a = document.createElement('a');
        const showText = `${row[0]}-${row[1]}`;
        a.innerText = showText;
        a.onclick = () => {
            input.value = showText;
        };
        pm_meets.append(a);
    });

};

// 照片選擇
document.getElementById('file').onchange = (e) => {
    var files = e.target.files;

    if (FileReader && files && files.length) {
        document.querySelector('.fileinput span').innerText = e.target.files[0].name;

        var fr = new FileReader();
        fr.onload = function () {
            document.querySelector('.fileinput img').src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
}

// 上傳
document.querySelector('#add_modal [type="submit"]').onclick = () => {
    const title = document.querySelector('#add_modal input[name="title"]').value;
    const user = document.querySelector('#add_modal input[name="user_name"]').value || "匿名";
    const pm = document.querySelector('#add_modal input[name="pm_name"]').value;
    const file = document.querySelector('#add_modal input[type="file"]').files[0];

    console.log({
        title: title,
        user: user,
        pm: pm,
        file: file,
    })
};