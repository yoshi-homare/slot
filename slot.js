'use strict';

{
  // クラス構文を設定。
  class panel {
    // コンストラクタで初期設定。
    constructor() {
      // section要素を作成しpanelクラスを付与。
      const section = document.createElement("section");
      section.classList.add("panel");

      // img要素を作成しsrcにイメージファイルをランダムに挿入。
      this.img = document.createElement("img");
      this.img.src = this.getRandomImage();

      // スロットを止める設定。
      this.timeoutId = undefined;

      // div要素を作成しテキストを挿入しクラスを付与。
      // inactiveクラスがついていたらクリックできないようにし外れていたらスロットをとめクラスを付与しの残りをカウント。
      // 残りが0になったらspinにクラスを付与し残りカウントもリセットし正誤判定もする。
      this.stop = document.createElement("div");
      this.stop.textContent = "STOP";
      this.stop.classList.add("stop", "inactive");
      this.stop.addEventListener("click", () => {
        if (this.stop.classList.contains("inactive")) {
          return;
        }
        this.stop.classList.add("inactive");

        clearTimeout(this.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
          spin.classList.remove("inactive")
          panelsLeft = 3;
          checkResult();
        };
      })

      // sectionに要素を挿入。
      section.appendChild(this.img);
      section.appendChild(this.stop);

      // dramIDにsectionを挿入。
      const dram = document.getElementById("dram");
      dram.appendChild(section);
    }

    // イメージファイルがランダムに表示されるよう設定。
    getRandomImage() {
      const images = [
        "img/gorushi01.jpg",
        "img/gorushi02.jpg",
        "img/gorushi03.png",
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    // spinを押されたときイメージファイルが設定時間でランダムに回るように設定。
    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    // イメージファイルが同じになってるかの判定を設定。
    isUnmatched(p1, p2) {
      if (this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
        return true;
      } else {
        return false;
      }
    }

    // 正誤判定で誤っていたらクラスを付与。
    unmatch() {
      this.img.classList.add("unmatched");
    }

    // クラスを外す設定。
    activate() {
      this.img.classList.remove("unmatched");
      this.stop.classList.remove("inactive");
    }
  }

  // 正誤判定の設定。
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  // クラスのインスタンスを呼び出し。
  const panels = [
    new panel(),
    new panel(),
    new panel(),
  ];

  // 残りカウントを設定。
  let panelsLeft = 3;

  // spinIDをクリックしてinactiveがついていたらクリックできないようにしついていなかったら全てのイメージファイルがランダムに回るようにしimgとstopのクラスを外す。
  const spin = document.getElementById("spin");
  spin.addEventListener("click", () => {
    if (spin.classList.contains("inactive")) {
      return;
    }
    spin.classList.add("inactive");
    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    });
  });
}