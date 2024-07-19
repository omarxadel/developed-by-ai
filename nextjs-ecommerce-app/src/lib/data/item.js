export async function getItems() {
  try {
    const data = [
      {
        id: 1,
        name: "Product 1",
        description: "Description of Product 1",
        price: 29.99,
        image: "https://placehold.co/400", // replace with your image path
      },
      {
        id: 2,
        name: "Product 2",
        description: "Description of Product 2",
        price: 39.99,
        image: "https://placehold.co/400", // replace with your image path
      },
      {
        id: 3,
        name: "Product 3",
        description: "Description of Product 3",
        price: 49.99,
        image: "https://placehold.co/400", // replace with your image path
      },
    ];
    return new Promise((res) => setTimeout(() => res({ data }), 1000));
  } catch (e) {
    console.error(e);
    throw Error("Something went wrong");
  }
}
