interface QueueDisplayProps {
  calledTickets: { id: string; guiche: string; called: boolean }[];
}

export function QueueDisplay({ calledTickets }: QueueDisplayProps) {
  const calledAndLimitedTickets = calledTickets
    .filter((item) => item.called)
    .slice(1, 6);

  console.log(calledAndLimitedTickets);

  return (
    <div className="bg-white shadow-md rounded-lg pl-6 pr-6 pt-4 pb-4">
      <h2 className="text-3xl font-bold mb-4 text-center">Senhas Chamadas</h2>
      {calledAndLimitedTickets.length > 0 ? (
        <ul className="space-y-2">
          {calledAndLimitedTickets.map((item, index) => (
            <li
              key={index}
              className="flex bg-blue-500 rounded-md justify-between items-center pl-8 pr-8 "
            >
              <span className="text-2xl text-center text-white">{item.id}</span>
              <span className="text-2xl text-center text-white">
                {`Guichê ${item.guiche}`}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nenhuma senha foi chamada ainda.</p>
      )}
    </div>
  );
}
