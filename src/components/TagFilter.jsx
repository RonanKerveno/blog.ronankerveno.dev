
// Barre des tags.
export default function TagFilter({ tags, selectedTags, onTagClick }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick(tag.id)}
          className={`rounded p-1.5 text-sm ${selectedTags.includes(tag.id)
            ? 'bg-slate-800 text-white'
            : 'bg-slate-100 text-slate-800'
            }`}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}

