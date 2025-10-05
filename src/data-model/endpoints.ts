const url = "https://poetrydb.org";

export const searchByAuthor = async (authorName: string) => {
  const searchUrl = `${url}/author/${authorName}/title,author,linecount`;
  const response = await fetch(searchUrl, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const searchByTitle = async (title: string) => {
  const searchUrl = `${url}/title/${title}/title,author,linecount`;
  const response = await fetch(searchUrl, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const retrievePoem = async (authorName: string, title: string) => {
  const searchUrl = `${url}/author,title/${authorName};${title}`;
  const response = await fetch(searchUrl, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
