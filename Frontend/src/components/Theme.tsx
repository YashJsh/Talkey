import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../store/useThemeStore';


const Theme = () => {
    const {theme, setTheme } = useTheme();

  return (
    <button className="btn btn-ghost p-2" onClick={()=>setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === 'dark' ? <Moon /> : <Sun/>}
    </button>
  )
}
export default Theme