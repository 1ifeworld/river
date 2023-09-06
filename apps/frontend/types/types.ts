import { Hex } from "viem";

export interface Channel {
    name: string;
    description?: string;
    creator: Hex;
    members?: string[];
    cover: string;
  }
  
export interface Listing {
    chainId: bigint;
    tokenId: bigint;
    listingAddress: Hex;
    hasTokenId: boolean;
  }

export interface PieceMetadata {
    id: string;
    pieceName?: string;
    pieceCreator: Hex;
    pieceDescription?: string;
    pieceImageURL?: string;
    pieceAnimationURL?: string;
    pieceCreatedDate: string;
    pieceContentType?: string;
  }
  
export interface ListingExtended extends Listing{
    id: string;
    createdAt: bigint; 
    createdBy: Hex;
    channel?: Channel; 
    listingTargetMetadata?: PieceMetadata | null;
  }
  

