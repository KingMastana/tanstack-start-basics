// app/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

async function loadUser() {
  const userId = Math.floor(Math.random() * 9 + 1);
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    var photo = await loadPhoto();

    const json = await response.json();

    return {
      photo: photo,
      data: json,
    };
  } catch (e: any) {
    console.error(e.message);
    return e.message;
  }
}

async function loadPhoto() {
  const url = "https://picsum.photos/200";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    var image = await response.url;

    return image;
  } catch (e: any) {
    console.error(e.message);
    return undefined;
  }
}

const generateRandomUser = createServerFn({
  method: "GET",
}).handler(() => {
  return loadUser();
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await generateRandomUser(),
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();
  const photo = state.photo;
  const name = state.data["name"];
  const username = state.data["username"];
  const email = state.data["email"];
  const address = state.data["address"];
  const street = address["street"];
  const suite = address["suite"];
  const city = address["city"];

  return (
    <div className="mx-auto pl-10">
      <img src={photo} alt="Photo" />

      <h1>{name}</h1>
      <h2>Username: {username}</h2>
      <h3>Email: {email}</h3>
      <p>
        Lives at {street}, {suite}, {city}.
      </p>
      <button
        type="button"
        onClick={() => {
          generateRandomUser().then(() => {
            router.invalidate();
          });
        }}
      >
        Load Random User
      </button>
    </div>
  );
}
