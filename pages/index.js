import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'



function ProfileSidebar(propriedades) {
  return(
    <Box as='aside'>
       <img src={`https://github.com/${propriedades.githubUser }.png`} style={{borderRadius: '8px'}}/>
       <hr />
        <p>
          <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
            @{propriedades.githubUser}
          </a>
       </p>
       <hr/>
       <AlurakutProfileSidebarMenuDefault/>
  </Box>
  )
}
function ProfileRelationsBox(propriedades) {
return (<ProfileRelationsBoxWrapper> 
          <h2 className="smallTitle">
            {propriedades.title} ({propriedades.items.length})
            </h2>
          <ul>
          {/* { {propriedades.map((itemAtual) => {
            return (
          //     <li key={itemAtual}>
          //   <a href={`/users/${itemAtual}`} key={itemAtual}>
          //     <img src={`https://github.com/${itemAtual}.png`} />
          //     <span>{itemAtual}</span>
          //   </a>
          //   </li>
          //   )
          // }
          )}} */}
          </ul>
        </ProfileRelationsBoxWrapper>
        )}

export default function Home() {
  const githubUser = 'rafess';
  const [comunidades, setComunidades] = React.useState([]);
  const pessoasFavoritas = [
    'marcobrunodev', 
    'omariosouto', 
    'peas', ]
  //  0- Pegar o array de dados do github
 const [seguidores, setSeguidores]= React.useState ([]);
  React.useEffect(function(){
    fetch('https://api.github.com/users/rafess/followers')
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      } 
    )
    .then(function(respostaCompleta){
        setSeguidores(respostaCompleta);
        }
      )
// API GraphQL:
      fetch('https://graphql.datocms.com/', {
        method: "POST",
        headers:
        {'Authorization': '06819d35b8d5b23a2eba5ce49fcd4f',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      }` })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesDato)
      setComunidades(comunidadesDato)
    })
  }, [])
  // 1- Criar um box que vai ser um map, baseado nos itens
  // do array que pegamos do github

  return (
    <>
    <AlurakutMenu githubUser='rafess'/>
    <MainGrid>
      
      <div className="profileArea"style={{gridArea: 'profileArea'}}>
       <ProfileSidebar githubUser = {githubUser}/>
      </div>
      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>
         <h1 className="title"> Bem-Vindo(a) </h1>
         <OrkutNostalgicIconSet></OrkutNostalgicIconSet>
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCreateComunity(event){
              event.preventDefault();
              const dadosDoForm = new FormData(event.target);
              console.log('Campo:', dadosDoForm.get('title'));
              console.log('Campo:', dadosDoForm.get('image'));
              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser,
              }
              
              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': "application/json",
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response)=> {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado;
                const attComunidades = [...comunidades, comunidade]
                setComunidades(attComunidades);
              })

              
          }}>
            <div>
              <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
              />
            </div>
            <div>
              <label 
                  for="image"        
              >
                Escolha a capa da comunidade:
              </label>
              <input
                placeholder= 'https://example.com'
                name="image" 
                id="image"
                type="url"              
              />
            </div>
            <button>Criar Comunidade</button>
          </form>
        </Box>

      </div>
      <div className="profileRelationsArea"style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper> 
          <h2 className="smallTitle">
            
          Amigos ({pessoasFavoritas.length})</h2>
          <ul>
          {pessoasFavoritas.map((itemAtual) => {
            return (
              <li key={itemAtual}>
            <a href={`/users/${itemAtual}`} key={itemAtual}>
              <img src={`https://github.com/${itemAtual}.png`} />
              <span>{itemAtual}</span>
            </a>
            </li>
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
              
            Comunidades ({comunidades.length})
          </h2>
          <ul> 
            {comunidades.map((itemAtual) => {
              return (
                <li key={itemAtual.id}>
                  <a href={`/communities/${itemAtual.id}`}>
                    <img src={itemAtual.imageUrl} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })}
            </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBox title="Seguidores" items={seguidores}/>
      </div>     
    </MainGrid>
    </>
  )
}
