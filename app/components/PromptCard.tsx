export function PromptCard(data: any) {
  return (
    <div className="flex flex-col items-center gap-3 bg-gray-900 rounded-md p-4">
      <p className="text-sm">
        <span className="text-pink-700">USER PROMPT: </span>{" "}
        {data.prompt[1]}
      </p>
      <p className="">
        <span className="text-green-600">AI ANSWERED: </span>{" "}
        {data.prompt[2]}
      </p>
    </div>
  );
}
