export default function How_It_Works() {
  return (
    <div className="flex flex-col 2xl:flex-row gap-4 my-1 md:my-2 font-normal">
      <div className="w-full 2xl:w-1/2 p-1 mx-1 text-left">
        {[
          {
            question: "What is going on?",
            content:
              "You are looking at a visualization of an ML random forest classifier, trained to predict whether an NFL coach is likely to be fired.",
          },
          {
            question: "What is heat index?",
            content:
              "The confidence, from 0.0 to 1.0, that the model thinks a coach resembles a coach who will be fired. If a coach exceeds 0.5, then the model predicts that coach to be fired.",
          },
          {
            question: "What factors does the model consider?",
            content:
              "Currently, 23 factors, spanning from win/loss records, playoff performance, experience in years to less obvious features like are you working under the same GM who hired you? what about the same owner? how many coach of the year votes have you received? etc. But so far, the most dominant factors appear to be winning percentage, and change of winning percentage relative to each of the previous 3 years.",
          },
          {
            question: "How accurate is the model?",
            content:
              "Accurate enough... but far from perfect.  It is hard to capture a coach who has lost the locker room or has a poor public image with just season results.  Future features include sentiment analysis from beat reporters, coach salary, team market size, etc. ",
          },
          {
            question: "How did I make this?",
            content:
              'The data is from pro-football-reference.com, the model is hosted on Render and each time you change the inputs to " What If? " it is called, and this site is served on Netlify, which the url should\'ve told you already.',
          },
        ].map(({ question, content }) => (
          <div className="p-2 2xl:p-4">
            <h3 className="text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl">
              {question}
            </h3>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              {content}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full 2xl:w-1/2 text-xs md:text-sm xl:text-base 2xl:text-lg text-center flex flex-col items-center h-full 2xl:mt-8">
        <div className="h-1/3 flex flex-col items-center">
          <img
            src="/images/misc/tree_full.png"
            alt="Decision tree visualization"
            className="w-full h-[80%] object-contain rounded-lg"
          />
          <p className="h-[20%]">
            graphviz visualization of random forest classifier
          </p>
        </div>
        <div className="h-1/3 flex flex-col items-center">
          <img
            src="/images/misc/shap.png"
            alt="SHAP Feature Weights"
            className="h-[60%] object-contain rounded-lg"
          />
          <div className="h-[40%] flex flex-col items-center">
            <p>feature value using Python's SHAP library</p>
            {[
              {
                text: "srs = pro football reference's simple rating system",
              },
              {
                text: "ou = team record vs vegas expectation",
              },
              {
                text: "tenure = years with team",
              },
            ].map(({ text }) => (
              <p className="text-[0.625rem] md:text-xs lg:text-sm">{text}</p>
            ))}
          </div>
        </div>
        <div className="h-1/3 flex flex-col items-center">
          <img
            src="/images/misc/confusion.png"
            alt="Confusion matrix"
            className="h-[80%] object-contain rounded-lg"
          />
          <p className="h-[20%]">heat map showing results from training data</p>
        </div>
      </div>
    </div>
  );
}
