import { GameStore} from "@/types/Store"
import { SteamIcon } from "@/components/icons/SteamIcon"
import { XboxIcon } from "@/components/icons/XboxIcon"
import { Ps5Icon } from "@/components/icons/Ps5Icon"
import { NintendoIcon } from "@/components/icons/NintendoIcon"

type StoreIconsProps = {
    stores: GameStore[]
}

export const StoreIcons = ({ stores }: StoreIconsProps) => {

    const iconMap: Record<string, React.ReactNode> = {
        steam: <SteamIcon />,
        "playstation-store": <Ps5Icon />,
        "xbox-store": <XboxIcon />,
        "marketplace.xbox.com": <XboxIcon />,
        nintendo: <NintendoIcon />
    }

    return (
        <div className="store-icons flex items-center gap-2.5 justify-start">
            {stores.length > 0 && stores.map((storeData) => (
                <div key={storeData.store.slug} className="empty:hidden">
                    {iconMap[storeData.store.slug] ?? null}
                </div>
            ))}
        </div>
    )
}