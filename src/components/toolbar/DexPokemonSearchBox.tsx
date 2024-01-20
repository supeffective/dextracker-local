import { DexTrackerOptionsState } from '@/stores/types/state'
import useDexTrackerStore from '@/stores/useDexTrackerStore'
import DebouncedSearchBox, { DebouncedSearchBoxProps } from '../primitives/DebouncedSearchBox'

export default function DexPokemonSearchBox(props: DebouncedSearchBoxProps) {
  const store = useDexTrackerStore((store) => store)
  const dexOptions: DexTrackerOptionsState = store.options ?? {}

  const handleSearchChange = (searchQuery: string) => {
    store.setSearchQuery(searchQuery)
  }

  if (!store.currentFullDexId) {
    return null
  }

  return (
    <DebouncedSearchBox
      type="search"
      name="pokemon-search"
      placeholder="Search Pokémon..."
      debounceDelay={300}
      defaultValue={dexOptions.searchQuery}
      onDebouncedChange={handleSearchChange}
      {...props}
    />
  )
}
