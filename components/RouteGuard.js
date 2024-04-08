import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { favouritesAtom, searchHistoryAtom } from "@/store"
import { getFavourites, getHistory } from "@/lib/userData"
import { useRouter } from "next/router"
import { isAuthenticated } from "@/lib/authenticate"

const PUBLIC_PATHS = ["/login", "/", "/_error", "/register"]

export default function RouteGuard(props) {
  const router = useRouter()
  const [, setAuthorized] = useState(false)
  const [, setFavouritesList] = useAtom(favouritesAtom)
  const [, setSearchHistory] = useAtom(searchHistoryAtom)

  async function updateAtoms() {
    setFavouritesList(await getFavourites())
    setSearchHistory(await getHistory())
  }

  useEffect(() => {
    updateAtoms()
    authCheck(router.pathname)

    router.events.on("routeChangeComplete", authCheck)

    return () => {
      router.events.off("routeChangeComplete", authCheck)
    }
  }, [])
  function authCheck(url) {
    const path = url.split("?")[0]
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false)
      router.push("/login")
    } else {
      setAuthorized(true)
    }
  }
  return <>{props.children}</>
}