import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import userDB, { userTypeWithSearchIndex, userType } from './userDB';


function InviteBox(){
  const [filteredUsers, setFilteredUsers] = useState<userTypeWithSearchIndex[]>([]);
  const [selected, setSelected] = useState<userType[]>([]);
  
  
  const handleSearchInputChange = (e:any) => {
    const filteredListWithIndex:userTypeWithSearchIndex[] = [];
    const value:string = e.target.value;
    
    const selectedUsersIds = new Set(selected.map(x => x.id));
    const notSelectedUsers = userDB.filter(({ id }) => !selectedUsersIds.has(id) );

    if( value.length !== 0){
      notSelectedUsers.forEach((user) => {
        let searchIndex = user.name.toLocaleLowerCase().search(value.toLocaleLowerCase());
        if( searchIndex !== -1){
          filteredListWithIndex.push({
            ...user,
            index: searchIndex,
            searchTermLength: value.length
          });
        }
      })
    }
    setFilteredUsers(filteredListWithIndex);
  }
  
  const handleSelectUser = ({name, id, team}:userTypeWithSearchIndex) => {
    setSelected( prevSelected => {
      return [
        ...prevSelected,
        {name, id, team}
      ]
    });
    setFilteredUsers(prevFliteredUsers => prevFliteredUsers.filter((user) => user.id !== id));
    
  }
  
  const handleRemoveSelection = ({id}: userType) => {
    setSelected( prevSelected => prevSelected.filter(user => user.id !== id ));
  }

  return (
    <div className={`
      p-8 mx-auto my-20 w-96 bg-zinc-800 rounded-lg text-zinc-100 drop-shadow-md
    `}>
      <h1 className="text-xl font-semibold tracking-wide">
        Invite members
      </h1>
      <InviteSearchInput onChange={handleSearchInputChange}/>
      <div>
        <h2 className='text-lg'>
          {filteredUsers.length > 0? `${filteredUsers.length} Results`: 'No Results'}
        </h2>
        <ul className='flex flex-col my-4 max-h-56 overflow-y-auto'>
          {filteredUsers.map((user) => <SearchResultItem key={user.id} user={user} onClick={() => handleSelectUser(user)} />)}
        </ul>
      </div>
      <div>
        <h2 className='text-lg'>
          Selected
        </h2>
        <ul className='my-4 flex overflow-y-visible'>
          {selected.map((user) => <SelectedListItem user={user} key={user.id} onClick={() => handleRemoveSelection(user)} />)}
        </ul>
      </div>
      <button
        className={`mt-4 w-full py-3 rounded-lg bg-violet-500`}
        onClick={() => console.log(selected)}
      >Invite</button>
    </div>
  )
}

function SelectedListItem({user, onClick}:{user:userType, onClick: any}){
  const { name } = user;
  const initials = name.split(' ').map((parts) => parts[0]).join('');

  const CloseDot = () => (
    <span className={`
      absolute top-0 right-0 flex justify-center items-center h-5 w-5 bg-zinc-400 rounded-full text-xs
      translate-x-2 -translate-y-1  border-2 border-zinc-800 hover:bg-red-500 cursor-pointer 
    `}
      onClick={onClick}
    >
      <MdClose/>
    </span>
  );

  return (
    <li className=' shrink-0 flex flex-col items-center mr-4 overflow-y-visible'>
      <span className='relative flex text-xs items-center justify-center w-10 h-10 bg-zinc-500 rounded-full'>
        {initials}
        <CloseDot/>
      </span>
      <span className='text-sm'>
        {name.split(' ')[0]}
      </span>
      
    </li>
  )
}

function SearchResultItem({ user, onClick }: { user: userTypeWithSearchIndex, onClick:any}) {
  const { name, team, index, searchTermLength } = user;

  const initials = name.split(' ').map((parts) => parts[0]).join('');
  const start = name.slice(0, index);
  const matched = name.slice(index, index+searchTermLength);
  const end = name.slice(index+searchTermLength, name.length);

  return (
    <li 
      className='flex p-2 hover:bg-zinc-500/20 cursor-pointer rounded-md'
      onClick={onClick}
    >
      <span className='flex text-xs mr-2 items-center justify-center w-10 h-10 bg-zinc-500 rounded-full'>
        {initials}
      </span>
      <div className='flex flex-col justify-center '>
        <span className='leading-4'>{start}<b className='text-violet-500'>{matched}</b>{end}</span>
        <small className='text-zinc-400 text-xs'>{team} Team</small>
      </div>
    </li>
  )
}

function InviteSearchInput({onChange}:{onChange:any}){
  return (
    <div className="flex max-w-lg my-4 items-center bg-zinc-950 rounded-md overflow-hidden">
      <span className='text-zinc-500 ml-4'>
        <FaSearch/>
      </span>
      <input 
        className="flex-1 ml-2 h-9 bg-transparent p-2 outline-none text-zinc-100"
        type="text" 
        onChange={onChange}
      />
    </div>
  )
}

function App() {
  return (
    <section className="">
      <InviteBox/>
    </section>
  );
}



export default App
