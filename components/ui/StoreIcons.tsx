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
        nintendo: <NintendoIcon />
    }

    return (
        <div className="store-icons flex items-center gap-2.5 justify-start pb-2.5">
            {stores.length > 0 && stores.map((store) => (
                <div key={store.id} className="empty:hidden">
                    {iconMap[store.store.slug] ?? null}
                </div>
            ))}
        </div>
    )
}