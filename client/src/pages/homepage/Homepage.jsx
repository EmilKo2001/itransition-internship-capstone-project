import { useState, useEffect } from "react";
import { useLocation } from "react-router";

import axios from "axios";

import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import Container from "../../components/Container";
import { Link } from "react-router-dom";

export default function Homepage() {
  const location = useLocation();
  const { search } = location;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <Container>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="lg:w-3/4">
          <section className="mb-8 lg:mb-16">
            <h1 className="mb-5	text-xl lg:mb-7 lg:text-4xl">
              Последнии айтемы
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <div className="card w-full shadow-xl">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
                <div className="card-body">
                  <h2 className="card-title mb-2">Item Title</h2>
                  <ul className="mb-4">
                    <li>
                      Коллеция:{" "}
                      <Link to="/" className="underline">
                        name
                      </Link>
                    </li>
                    <li>Автор: name</li>
                  </ul>
                  <button className="btn btn-primary">Смотреть</button>
                </div>
              </div>
              <div className="card w-full shadow-xl">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
                <div className="card-body">
                  <h2 className="card-title mb-2">Item Title</h2>
                  <ul className="mb-4">
                    <li>
                      Коллеция:{" "}
                      <Link to="/" className="underline">
                        name
                      </Link>
                    </li>
                    <li>Автор: name</li>
                  </ul>
                  <button className="btn btn-primary">Смотреть</button>
                </div>
              </div>
              <div className="card w-full shadow-xl">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
                <div className="card-body">
                  <h2 className="card-title mb-2">Item Title</h2>
                  <ul className="mb-4">
                    <li>
                      Коллеция:{" "}
                      <Link to="/" className="underline">
                        name
                      </Link>
                    </li>
                    <li>Автор: name</li>
                  </ul>
                  <button className="btn btn-primary">Смотреть</button>
                </div>
              </div>
              <div className="card w-full shadow-xl">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
                <div className="card-body">
                  <h2 className="card-title mb-2">Item Title</h2>
                  <ul className="mb-4">
                    <li>
                      Коллеция:{" "}
                      <Link to="/" className="underline">
                        name
                      </Link>
                    </li>
                    <li>Автор: name</li>
                  </ul>
                  <button className="btn btn-primary">Смотреть</button>
                </div>
              </div>
              <div className="card w-full shadow-xl">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
                <div className="card-body">
                  <h2 className="card-title mb-2">Item Title</h2>
                  <ul className="mb-4">
                    <li>
                      Коллеция:{" "}
                      <Link to="/" className="underline">
                        name
                      </Link>
                    </li>
                    <li>Автор: name</li>
                  </ul>
                  <button className="btn btn-primary">Смотреть</button>
                </div>
              </div>
            </div>
          </section>{" "}
          <section className="mb-8 lg:mb-16">
            <h2 className="mb-5	text-xl lg:mb-7 lg:text-4xl">
              Топ 5 больших коллекций
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <div className="card w-full shadow">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
                <div className="card-body">
                  <h2 className="card-title mb-2">Item Title</h2>
                  <p className="mb-2">Колическо айтемов: 10</p>
                  <button className="btn btn-primary">Смотреть</button>
                </div>
              </div>
              <div className="card w-full shadow-xl">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
                <div className="card-body">
                  <h2 className="card-title mb-2">Item Title</h2>
                  <p className="mb-2">Колическо айтемов: 10</p>
                  <button className="btn btn-primary">Смотреть</button>
                </div>
              </div>
              <div className="card w-full shadow-xl">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
                <div className="card-body">
                  <h2 className="card-title mb-2">Item Title</h2>
                  <p className="mb-2">Колическо айтемов: 10</p>
                  <button className="btn btn-primary">Смотреть</button>
                </div>
              </div>
              <div className="card w-full shadow-xl">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
                <div className="card-body">
                  <h2 className="card-title mb-2">Item Title</h2>
                  <p className="mb-2">Колическо айтемов: 10</p>
                  <button className="btn btn-primary">Смотреть</button>
                </div>
              </div>
              <div className="card w-full shadow-xl">
                <img
                  src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
                <div className="card-body">
                  <h2 className="card-title mb-2">Item Title</h2>
                  <p className="mb-2">Колическо айтемов: 10</p>
                  <button className="btn btn-primary">Смотреть</button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Sidebar />{" "}
      </div>
    </Container>
  );
}
