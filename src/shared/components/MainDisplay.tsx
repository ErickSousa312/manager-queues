import { Password } from "@/@types/passwords";

export function MainDisplay({ id, guiche }: Omit<Password, "called">) {
  return (
    <div className="bg-blue-600 flex flex-col items-center justify-center  text-white 2xl:h-96 shadow-md rounded-lg p-10">
      <h2 className="text-5xl 2xl:text-6xl font-bold text-center mb-4">
        Senha Atual
      </h2>
      <p className="text-8xl 2xl:text-9xl font-bold text-center mb-4">
        {id || "---"}
      </p>
      <p className="text-4xl 2xl:text-6xl text-center">
        Guichê: {guiche || "---"}
      </p>
    </div>
  );
}
