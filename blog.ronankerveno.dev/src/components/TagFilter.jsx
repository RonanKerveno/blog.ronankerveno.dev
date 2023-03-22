export default function TagFilter({ tags, selectedTags, onTagClick }) {
  return (
    <div className="flex gap-2 mb-4">
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagClick(tag.id, tag.name)}
          className={`rounded p-1.5 text-xs ${
            selectedTags.some((selectedTag) => selectedTag.id === tag.id)
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
