export default function How_It_Works() {
  return (
    <div className="flex flex-col 2xl:flex-row gap-4 my-1 md:my-2 font-normal items-center">
      <div className="w-full 2xl:w-1/2 order-2 2xl:order-1">
        <img
          src="/images/misc/tree_full.png"
          alt="Decision tree visualization"
          className="w-full rounded-lg"
        />
        <p className="text-sx md:text-sm xl:text-base 2xl:text-lg">
          graphviz visualization of random forest classifier
        </p>
      </div>
      <div className="w-full 2xl:w-1/2 order-1 2xl:order-2 p-1 mx-1 text-left">
        {[
          {
            question: "What is going on?",
            content:
              "You are looking at a visualization of an ML random forest classifier, trained to predict whether an NFL coach is likely to be fired.",
          },
          {
            question: "What is Heat Index?",
            content:
              "In short, the confidence, from 0.0 to 1.0, that the model thinks a coach resembles a coach who will be fired. If a coach exceeds 0.5, then the model predicts that coach to be fired.",
          },
          {
            question: "What factors does the model consider?",
            content:
              "Currently, 23 factors, spanning from win/loss records, playoff performance, experience in years to less obvious features like are you working under the same GM who hired you? what about the same owner? how many coach of the year votes have you received? etc. But so far, the most dominant factors appear to be winning percentage, and change of winning percentage relative to each of the previous 3 years.",
          },
        ].map(({ question, content }) => (
          <>
            <h3 className="text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl">
              {question}
            </h3>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {content}
            </p>
          </>
        ))}
      </div>
    </div>
  );
}
