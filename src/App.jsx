import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

function App() {
  const [animation, setAnimation] = useState();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const animation = document.querySelector('[data-testid="animation"]');

    setAnimation(animation);
  });

  // Get Position
  const getPosition = async (el) => {
    if (!el) return;

    const distance = Math.sqrt(
      Math.pow(el.offsetLeft - animation.offsetLeft, 2) +
        Math.pow(el.offsetTop - animation.offsetTop, 2)
    );

    const speed = 500;
    const duration = distance / speed;

    animation.style.transition = `transform ${duration}s ease`;

    const animationBottom = animation.offsetTop - animation.offsetHeight;
    const elBottom = el.offsetTop - el.offsetHeight;

    animation.style.opacity = "100%";

    animation.style.transform = `translate(${
      el.offsetLeft - animation.offsetLeft + animation.offsetHeight * 2
    }px, -${
      animation.offsetTop - el.offsetTop - (animationBottom - elBottom) / 2.5
    }px)`;
  };

  // Move animation to text
  const moveToText = async (e) => {
    const el = await e.target;
    await getPosition(el);
    setMsg("This text describes what the business does");
  };

  // Move animation to button
  const moveToButton = async (e) => {
    const el = await e.target;
    getPosition(el);
    setMsg("This button takes you to the Sign up/ Login page");
    setTimeout(() => {
      moveBack();
    }, 3000);
  };

  // Move animation to nav
  const moveToNav = async (e) => {
    const el = await e.target;
    await getPosition(el);
    setMsg(
      `Click on this text to navigate to the ${e.target.textContent} page`
    );
  };

  // Move animation back
  const moveBack = async () => {
    animation.style.transform = `translate(${animation.offsetLeft}px)`;
    setTimeout(() => {
      animation.style.opacity = "0";
    }, 1000);
    setMsg("");
  };

  return (
    <section className="w-full">
      <nav className="absolute top-0 left-0 right-0 z-30 flex justify-center text-gray-100 p-3 md:p-5 gap-6">
        {["About Us", "Contact Us", "Blogs"].map((item, i) => (
          <a
            onMouseOver={moveToNav}
            onMouseLeave={moveBack}
            className="hover:border-b-[1px] border-gray-300 ease-in duration-300"
            key={i + 1}
            href="#"
          >
            {item}
          </a>
        ))}
      </nav>
      <img
        className="abolute top-0 w-full h-[80vh] brightness-[0.2]"
        src="https://aofund.org/app/uploads/2022/09/business-grants-for-black-women-scaled.jpg"
        alt=""
      />

      <aside className="absolute top-1/2 left-0 -translate-y-1/2 grid grid-rows-2 md:grid-cols-2 md:mt-12 pl-10 ">
        <div className="  flex flex-col gap-10 pl-3">
          <h2
            className="text-gray-100 text-xl sm:text-4xl"
            onMouseOver={moveToText}
            onMouseLeave={moveBack}
          >
            This is a Business
          </h2>
          <p
            onMouseOver={moveToText}
            onMouseLeave={moveBack}
            className="text-base text-gray-100 sm:text-xl"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
            obcaecati esse quis, temporibus quas explicabo veritatis debitis,
            ducimus, ut id expedita molestiae? Voluptate totam deleniti quod nam
            rem veniam illum.
          </p>
          <button
            onClick={moveToButton}
            className="py-2 px-4 text-gray-200 text-base sm:text-xl bg-gray-700 rounded-lg w-fit"
          >
            Get Started
          </button>
        </div>
        <div className="text-gray-100 flex flex-col gap-3"></div>
      </aside>
      <div
        data-testid="animation"
        className={`flex flex-col opacity-0 sm:text-start  rounded-[50%] absolute left-5 bottom-5 transition-all ease-in duration-1000`}
      >
        <Icon
          className="text-6xl sm:text-8xl animate-bounce"
          icon="fluent-emoji-flat:girl-medium"
        />
        <p className="bg-green-900 text-gray-100 font-semibold px-6 py-3 rounded-3xl type">
          {msg}
        </p>
      </div>
    </section>
  );
}

export default App;
