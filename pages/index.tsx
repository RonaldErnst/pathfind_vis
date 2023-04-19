import AlgControls from "@/components/AlgControls";
import Grid from "@/components/Grid";
import GridControls from "@/components/GridControls";
import { AlgorithmProvider } from "@/contexts/AlgorithmContext";
import { GridProvider } from "@/contexts/GridContext";

export default function Home() {
	return (
		<main className="relative flex w-full h-full flex-col items-center justify-between">
			<GridProvider height={16} width={20}>
				<AlgorithmProvider>
					<div className="w-full bg-sky-950 grid place-items-center py-4">
						<GridControls />
					</div>
					<div className="w-full h-full bg-slate-500 p-16">
						<Grid />
					</div>
					<AlgControls />
				</AlgorithmProvider>
			</GridProvider>
		</main>
	);
}
