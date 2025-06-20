
import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  body: string;
  date: string;
}

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome to Notes',
      body: 'This is your first note. You can add, view, and delete notes using this simple interface.',
      date: new Date().toLocaleDateString()
    }
  ]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      body: body.trim(),
      date: new Date().toLocaleDateString()
    };

    setNotes([newNote, ...notes]);
    setTitle('');
    setBody('');
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Notes App</h1>
        
        {/* Add Note Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Note</h2>
          <form onSubmit={addNote} className="space-y-4">
            <div>
              <input
                id="note-title"
                type="text"
                placeholder="Note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <textarea
                id="note-body"
                placeholder="Write your note here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical"
              />
            </div>
            <button
              id="add-note-button"
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Add Note
            </button>
          </form>
        </div>

        {/* Notes List */}
        <div id="notes-list" className="space-y-4">
          {notes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No notes yet. Add your first note above!</p>
            </div>
          ) : (
            notes.map((note) => (
              <div
                key={note.id}
                className="note-item bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
                    {note.title}
                  </h3>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="delete-note-button p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                    aria-label="Delete note"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-3">{note.date}</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {note.body}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
