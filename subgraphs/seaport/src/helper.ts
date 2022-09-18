import { Address, BigDecimal, BigInt, Bytes, ethereum, log } from "@graphprotocol/graph-ts";

export namespace MethodSignatures {
  export const FULFILL_BASIC_ORDER = "0xfb0f3ee1"
  export const FULFILL_ORDER = "0xb3a34c4c"
  export const FULFILL_ADVANCED_ORDER = "0xe7acab24"
  export const MATCH_ORDERS = "0xa8174404"
  export const MATCH_ADVANCED_ORDERS = "0x55944a42"
  export const FULFILL_ADVANCED_ORDERS = "0xed98a574"
  export const FULFILL_AVAILABLE_ADVANCED_ORDERS = "0x87201b41"
}

export namespace MethodSignatureTypeStrings {
  export const FULFILL_ORDER_TYPE = "((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),bytes),bytes32)"
  export const FULFILL_BASIC_ORDER_TYPE = "(address,uint256,uint256,address,address,address,uint256,uint256,uint8,uint256,uint256,bytes32,uint256,bytes32,bytes32,uint256,(uint256,address)[],bytes)" 
  export const FULFILL_ADVANCED_ORDER_TYPE = "((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),uint120,uint120,bytes,bytes),(uint256,uint8,uint256,uint256,bytes32[])[],bytes32,address)"
  export const MATCH_ORDERS_TYPE = "((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),bytes)[],((uint256,uint256)[],(uint256,uint256)[])[])"
  export const MATCH_ADVANCED_ORDERS_TYPE = "((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),uint120,uint120,bytes,bytes)[],(uint256,uint8,uint256,uint256,bytes32[])[],((uint256,uint256)[],(uint256,uint256)[])[])"
}

export const PROTOCOL_SCHEMA_VERSION = "1.0.0";

export namespace Network {
  export const ARBITRUM_ONE = "ARBITRUM_ONE";
  export const ARWEAVE_MAINNET = "ARWEAVE_MAINNET";
  export const AURORA = "AURORA";
  export const AVALANCHE = "AVALANCHE";
  export const BOBA = "BOBA";
  export const BSC = "BSC"; // aka BNB Chain
  export const CELO = "CELO";
  export const COSMOS = "COSMOS";
  export const MAINNET = "MAINNET"; // Ethereum mainnet
  export const FANTOM = "FANTOM";
  export const FUSE = "FUSE";
  export const HARMONY = "HARMONY";
  export const JUNO = "JUNO";
  export const MOONBEAM = "MOONBEAM";
  export const MOONRIVER = "MOONRIVER";
  export const NEAR_MAINNET = "NEAR_MAINNET";
  export const OPTIMISM = "OPTIMISM";
  export const OSMOSIS = "OSMOSIS";
  export const MATIC = "MATIC"; // aka Polygon
  export const XDAI = "XDAI"; // aka Gnosis Chain
  export const CRONOS = "CRONOS"; // Crypto.com Cronos chain
}

export namespace NftStandard {
  export const ERC721 = "ERC721";
  export const ERC1155 = "ERC1155";
  export const UNKNOWN = "UNKNOWN";
}

export namespace SaleStrategy {
  export const STANDARD_SALE = "STANDARD_SALE";
  export const ANY_ITEM_FROM_COLLECTION = "ANY_ITEM_FROM_COLLECTION";
  export const ANY_ITEM_FROM_SET = "ANY_ITEM_FROM_SET";
  export const DUTCH_AUCTION = "DUTCH_AUCTION";
  export const PRIVATE_SALE = "PRIVATE_SALE";
}

// Constants ported from Seaport contracts
// See https://github.com/ProjectOpenSea/seaport/blob/main/contracts/lib/ConsiderationEnums.sol#L116
export namespace SeaportItemType {
  export const NATIVE = 0;
  export const ERC20 = 1;
  export const ERC721 = 2;
  export const ERC1155 = 3;
  export const ERC721_WITH_CRITERIA = 4;
  export const ERC1155_WITH_CRITERIA = 5;
}

export const BIGINT_ZERO = BigInt.zero();
export const BIGDECIMAL_ZERO = BigDecimal.zero();
export const BIGDECIMAL_MAX = BigInt.fromI32(i32.MAX_VALUE).toBigDecimal();
export const MANTISSA_FACTOR = BigInt.fromI32(10)
  .pow(18 as u8)
  .toBigDecimal();
export const BIGDECIMAL_HUNDRED = BigInt.fromI32(100).toBigDecimal();
export const SECONDS_PER_DAY = 24 * 60 * 60;

export const EXCHANGE_ADDRESS = Address.fromString(
  "0x00000000006c3852cbef3e08e8df289169ede581"
);
export const WETH_ADDRESS = Address.fromString(
  "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
);
export const ERC721_INTERFACE_IDENTIFIER = "0x80ac58cd";
export const ERC1155_INTERFACE_IDENTIFIER = "0xd9b67a26";

export function min(a: BigDecimal, b: BigDecimal): BigDecimal {
  return a.lt(b) ? a : b;
}

export function max(a: BigDecimal, b: BigDecimal): BigDecimal {
  return a.lt(b) ? b : a;
}

export function isMoney(itemType: i32): boolean {
  return (
    itemType == SeaportItemType.NATIVE || itemType == SeaportItemType.ERC20
  );
}

export function isNFT(itemType: i32): boolean {
  return (
    itemType == SeaportItemType.ERC721 ||
    itemType == SeaportItemType.ERC1155 ||
    itemType == SeaportItemType.ERC721_WITH_CRITERIA ||
    itemType == SeaportItemType.ERC1155_WITH_CRITERIA
  );
}

export function isERC721(itemType: i32): boolean {
  return (
    itemType == SeaportItemType.ERC721 ||
    itemType == SeaportItemType.ERC721_WITH_CRITERIA
  );
}

export function isERC1155(itemType: i32): boolean {
  return (
    itemType == SeaportItemType.ERC1155 ||
    itemType == SeaportItemType.ERC1155_WITH_CRITERIA
  );
}

export function isOpenSeaFeeAccount(address: Address): boolean {
  const OPENSEA_WALLET_ADDRESS = Address.fromString(
    "0x5b3256965e7c3cf26e11fcaf296dfc8807c01073"
  );
  const OPENSEA_FEES_ACCOUNT = Address.fromString(
    "0x8de9c5a032463c561423387a9648c5c7bcc5bc90"
  );
  // This can be found https://github.com/web3w/seaport-js/blob/399fa568c04749fd8f96829fa7a6b73d1e440458/src/contracts/index.ts#L30
  const OPENSEA_ETHEREUM_FEE_COLLECTOR = Address.fromString(
    "0x0000a26b00c1F0DF003000390027140000fAa719"
  );
  return (
    address == OPENSEA_WALLET_ADDRESS ||
    address == OPENSEA_FEES_ACCOUNT ||
    address == OPENSEA_ETHEREUM_FEE_COLLECTOR
  );
}

export const valueToString = (value:ethereum.Value):string => {
  
  if(value.kind === ethereum.ValueKind.ADDRESS) {
    return value.toAddress().toHexString()
  }
  if(value.kind === ethereum.ValueKind.BOOL) {
    return value.toBoolean() ? "True" : "False"
  }
  if(value.kind === ethereum.ValueKind.BYTES) {
    return value.toBytes().toHexString()
  }
  if(value.kind === ethereum.ValueKind.FIXED_BYTES) {
    return value.toBytes().toHexString()
  }
  if(value.kind === ethereum.ValueKind.INT) {
    return value.toBigInt().toString()
  }
  if(value.kind === ethereum.ValueKind.STRING) {
    return value.toString()
  }
  if(value.kind === ethereum.ValueKind.UINT) {
    return value.toBigInt().toString()
  }
  if(value.kind === ethereum.ValueKind.ARRAY) {
    return "Is an array"
  }
  
  return "value kind not found"
}

export function decodeInput(event:ethereum.Event):void {
  let methodSignature = event.transaction.input.toHexString().slice(0,10)
  

  let typeString:string | null = null; 

  // decode in the inputs
  
  if(methodSignature.toUpperCase() == MethodSignatures.FULFILL_BASIC_ORDER.toUpperCase()) {
    typeString = MethodSignatureTypeStrings.FULFILL_BASIC_ORDER_TYPE
  }

  if(methodSignature == MethodSignatures.FULFILL_ORDER) {
    typeString = MethodSignatureTypeStrings.FULFILL_ORDER_TYPE
  }

  if(methodSignature == MethodSignatures.FULFILL_ADVANCED_ORDER) {
    typeString = MethodSignatureTypeStrings.FULFILL_ADVANCED_ORDER_TYPE
  }

  if(methodSignature == MethodSignatures.MATCH_ORDERS) {
    typeString = MethodSignatureTypeStrings.MATCH_ORDERS_TYPE
  }

  if(methodSignature == MethodSignatures.MATCH_ADVANCED_ORDERS) {
    typeString === MethodSignatureTypeStrings.MATCH_ADVANCED_ORDERS_TYPE
  }
  


  if(typeString !== null) {

    let inputHexString = event.transaction.input.toHexString().slice(10)

    let dataToDecode = Bytes.fromByteArray(Bytes.fromHexString(inputHexString));

    let decoded = ethereum.decode(typeString, dataToDecode);
    if(decoded !== null) {
      
      let decodedArray = decoded.toTuple()
      
      for(let i = 0; i < decodedArray.length; i++) {
        let tupleValue = valueToString(decodedArray[i])  
        let message = "DECODED INPUT FOR TRANSACTION "
                      .concat(event.transaction.hash.toHexString())
                      .concat(" item ")
                      .concat(i.toString())
                      .concat(" = ")
                      .concat(tupleValue)
        log.debug(message, [])
      }
      
    } else {
      log.debug('DECODED IS NULL {} : {}',[typeString, event.transaction.input.toHexString()])
    }
  } else {
    log.debug("TYPESTRING IS NULL {}", [methodSignature])
  }
} 