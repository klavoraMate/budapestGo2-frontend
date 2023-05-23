export const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 524, min: 300 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  
  export const newsData = [
    {
      id: 1,
      imageurl:
        "https://vezess2.p3k.hu/app/uploads/2019/10/mtimihadak-zoltanjoo.jpg",
      name: "Colorful",
      description: "Some text about the article..",
    },
    {
      id: 2,
      imageurl:
      process.env.PUBLIC_URL + "/news/newlines.png",
      name: "Sport",
      description: "Some text about the article..",
    },
    {
      id: 3,
      imageurl:
      process.env.PUBLIC_URL + "/news/oppening.png",
      name: "i",
      description: "Some text about the article..",
    },
    {
      id: 4,
      imageurl:
      process.env.PUBLIC_URL + "/news/upgrade.png",
      name: "Water",
      description: "Some text about the article..",
    },
    {
      id: 5,
      imageurl:
      process.env.PUBLIC_URL + "/news/free.png",
      name: "Van",
      description: "Some text about the article..",
    },
    {
      id: 6,
      imageurl:
      process.env.PUBLIC_URL + "/news/2t.jpg",
      name: "Coco",
      description: "Some text about the article..",
    },
    {
      id: 7,
      imageurl:
      process.env.PUBLIC_URL + "/news/ftram.jpg",
      name: "Sunglasses",
      description: "Some text about the article..",
    },
    {
      id: 8,
      imageurl:
        "https://www.mantruckandbus.com/fileadmin/_processed_/f/f/csm_FT_05-07_Header_52cfad8aab.jpg",
      name: "Dove",
      description: "Some text about the article..",
    },
  ];