"use client";
const page = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 text-center">
      <form
        className="flex flex-col items-center gap-3 "
        action=""
      >
        <p className="text-lg text-green-600">
          Enter Your Prompt so the AI generate a Social Media
          post for you
        </p>
        <input
          className="p-1 rounded-md outline-none "
          type="text"
        />
        <button
          className="w-40 p-1 text-lg font-bold text-black bg-green-600 rounded-md hover:scale-105"
          type="submit"
        >
          Enter
        </button>
      </form>
    </div>
  );
};

export default page;
