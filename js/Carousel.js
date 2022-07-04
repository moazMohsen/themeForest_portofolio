export class Carousel {
  constructor(next, prev, root, img) {
    this.next = next;
    this.prev = prev;
    this.root = root;
    this.img = Array.from(this.root.children);

    this.index = 1;
    this.scroled = 0;

    this.next.addEventListener("click", () => {
      this.prev.classList.remove("unenabled");

      const mediaQuery = window.matchMedia("(min-width: 753px)");
      if (mediaQuery.matches) {
        if (this.index === this.img.length - 3) {
          next.classList.add("unenabled");
        }
        if (this.index > this.img.length - 3) {
          return false;
        }
      }
      if (this.index === this.img.length - 2) {
        next.classList.add("unenabled");
      }
      if (
        this.index > this.img.length - 2 ||
        this.index > this.img.length - 1
      ) {
        return false;
      }
      // 16 = 1rem
      this.scroled = this.img[0].offsetWidth + 16;
      this.scroled = this.scroled * this.index;
      this.leftImg();
    });

    this.prev.addEventListener("click", () => {
      this.next.classList.remove("unenabled");

      if (this.index === 0 || this.scroled === 0) {
        this.prev.classList.add("unenabled");

        return false;
      }
      this.scroled -= this.img[0].offsetWidth + 16;

      this.rightImg();
    });
  }

  leftImg() {
    this.img.forEach((ele) => {
      ele.style.transform = `translatex(-${this.scroled}px)`;
    });
    this.index++;
  }

  rightImg() {
    this.img.forEach((ele) => {
      ele.style.transform = `translatex(-${this.scroled}px)`;
    });
    this.index--;
  }
}
