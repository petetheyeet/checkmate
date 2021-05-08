import { Move } from "./move";


export class Problem {

    FEN: string | undefined;
    title: string | undefined;
    
    id: number | undefined;
    userMoves: string | undefined;
    computeMoves: string | undefined;
    moveOrder: Move[] | undefined;
    moveOrderLength: number = 0;
};