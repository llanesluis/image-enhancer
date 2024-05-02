import Header from "../shared/Header";

export default function FAQ() {
  return (
    <section className="flex flex-col items-center gap-12">
      <div className="text-center">
        <Header title="Preguntas frecuentes 🤔" />
      </div>
      <Accordion />
    </section>
  );
}

function Accordion() {
  return (
    <div className="w-full max-w-5xl space-y-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <details
          className="group [&_summary::-webkit-details-marker]:hidden"
          key={item}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900 dark:bg-gray-900 dark:text-white">
            <h2 className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing?
            </h2>

            <svg
              className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-gray-200">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
            veritatis molestias culpa in, recusandae laboriosam neque aliquid
            libero nesciunt voluptate dicta quo officiis explicabo consequuntur
            distinctio corporis earum similique!
          </p>
        </details>
      ))}
    </div>
  );
}
