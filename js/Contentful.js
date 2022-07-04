export class Contentful {
  constructor(portofolioBox, newsBox) {
    this.portofolioBox = portofolioBox;
    this.newsBox = newsBox;

    // contentful API
    this.client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: "9jymvtcxwh93",
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: "Jy0hf95do-oC9qE2Qf9AXzD9U5gmikd3jr2eQmB12KE",
    });

    document.getElementById("portofolio").addEventListener("click", () => {
      this.getContentful_portofolio().then((portofolio) => {
        this.UIPortofolio(portofolio);
      });
    });
    document.getElementById("content").addEventListener("click", () => {
      this.getContentful_content().then((content) => {
        this.UIcontent(content);
      });
    });
  }
  async getContentful_portofolio() {
    try {
      const resPortofolio = await this.client.getEntries({
        content_type: "isometric",
      });

      let portofolio = resPortofolio.items;

      // destructuring opj portofolio
      portofolio = portofolio.map((item) => {
        let { description, type } = item.fields;
        let img = item.fields.img.fields.file.url;

        return { description, type, img };
      });
      return portofolio;
    } catch (error) {
      console.log(error);
    }
  }
  async getContentful_content() {
    try {
      const resContent = await this.client.getEntries({
        content_type: "content",
      });

      let content = resContent.items;

      // destructuring opj content
      content = content.map((item) => {
        let { article, author, heading } = item.fields;
        let id = item.sys.id;
        let img = item.fields.img.fields.file.url;
        return { article, author, heading, img, id };
      });
      return content;
    } catch (error) {
      console.log(error);
    }
  }
  UIPortofolio(portofolio) {
    let result = "";
    portofolio.forEach((item) => {
      result += `
     <div class="portofolio-img all ${item.type}">
     <img
       src="${item.img}"
       alt="${item.type}"
     />
     <div class="portofolio-txt ">
       <h4>${item.type}</h4>
       <p>${item.description}</p>
     </div>
   </div>
     `;
    });
    this.portofolioBox.innerHTML = result;
  }

  UIcontent(content) {
    const MAX_BODY_LENGTH = 100;
    let result = "";
    content.forEach((item) => {
      result += `
      <div class="news-content grid " data-content='${item.id}'>
      <div class="news-img">
        <img src="${item.img}" alt="" />
      </div>
      <div class="news-txt">
        <h5 class="light-txt">By ${item.author} / ${this.getDate()} </h5>
        <p>
        ${item.article.substring(0, MAX_BODY_LENGTH)} 
        ${item.article.length > MAX_BODY_LENGTH ? "..." : " "} 
        </p>
        <a href="#" class="news-link"> red more</a>
      </div>
    </div>
    `;
    });
    this.newsBox.innerHTML = result;

    this.newsBox.querySelectorAll(".news-content").forEach((item) =>
      item.addEventListener("click", (e) => {
        this.UIcontentOverlay(item.dataset.content);
      })
    );
  }

  getDate() {
    let date = new Date().toLocaleString(undefined, {
      dateStyle: "full",
      timeStyle: "short",
    });
    return date;
  }

  UIcontentOverlay(id) {
    this.getContentful_content().then((content) => {
      let contentOverlay = content.filter((item) => item.id === id);

      let overlayBox = document.createElement("div");
      overlayBox.className = "overlayBox";

      let close_btn_news = document.createElement("div");
      close_btn_news.className = "close-btn-news";
      close_btn_news.innerHTML = `<i class="far fa-times-circle"></i>`;

      let result = `
      <div class="news-content-overlay grid animate-left" data-content='${
        contentOverlay[0].id
      }'>
      <div class="news-img-overlay">
        <img src="${contentOverlay[0].img}" alt="" />
      </div>
      <div class="news-txt-overlay">
      <p> ${contentOverlay[0].article}  </p>
        <h5 class="light-txt">By ${
          contentOverlay[0].author
        } / ${this.getDate()} </h5>

      </div>
      </div>
      `;

      overlayBox.innerHTML = result;
      overlayBox.appendChild(close_btn_news);
      document.body.appendChild(overlayBox);

      close_btn_news.addEventListener("click", () => {
        overlayBox.remove();
      });
    });
  }
}
