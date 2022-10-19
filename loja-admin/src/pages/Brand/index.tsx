import { ColumnActionsMode, IColumn, Panel, PanelType, SelectionMode, ShimmeredDetailsList, Stack, TextField } from "@fluentui/react";
import { IBrand } from "@typesCustom";
import { useCallback, useEffect, useState } from "react";
import { PageToolBar } from "../../components/PageToolBar";
import { MessageBarCustom } from "../../components/MessageBarCustom";
import { createBrand, listBrands } from "../../services/server";
import { PanelFooterContent } from "../../components/PanelFooterContent";


export function BrandPage() {

    //States = Entidades
    const [brand, setBrand] = useState<IBrand>({} as IBrand);
    const [brands, setBrands] = useState<IBrand[]>([]);

    //State = Mensagens
    const [messageError, setMessageError] = useState('');
    const [messageSuccess, setMessageSuccess] = useState('');

    //State = Carregando
    const [loading, setLoading] = useState(true);

    //State = Abre e fecha form
    const [openPanel, setOpenPanel] = useState(false);

    //Colunas

    const columns:  IColumn[] = [
        {
            key: 'name',
            name: 'Nome da Marca',
            fieldName: 'name',
            minWidth: 100,
            isResizable: false,
            columnActionsMode: ColumnActionsMode.disabled

        }
    ]

    //Renderizar barra de botoes no panel
    const onRenderFooterContent = (): JSX.Element => (
        <PanelFooterContent
            id={brand.id as number}
            loading={loading}
            onConfirm={handleConfirmSave}
            onDismiss={()=> setOpenPanel(false)} />
    );

    useEffect(()=> {

        listBrands()
            .then(result => {
                setBrands(result.data)
            })

            .catch(error => {
                setMessageError(error.message);
                setInterval(()=>{
                    handleDemissMessageBar();
                }, 10000);
            })

            .finally(() => setLoading(false))

    }, [])

    function handleDemissMessageBar() {
        setMessageError('');
        setMessageSuccess('');
    }

    function handleNew() {
        setBrand({
            name: ''
        });
        
        setOpenPanel(true);
    }

    async function handleConfirmSave() {
        
        createBrand(brand)
           .then(result =>{
            setBrands([...brands, result.data])

           })
           .catch(error => {
                setMessageError(error.message);
                setInterval(()=>{
                    handleDemissMessageBar();
                }, 10000);
        
            })
            .finally(() => {
                setOpenPanel(false)
            })



    return (
        <div id="brand-page" className="main-content">
            <Stack horizontal={false}>
                <PageToolBar
                    currentPageTitle="Marcas"
                    loading={loading}
                    onNew={ handleNew }/>

                <MessageBarCustom
                    messageError={messageError}
                    messageSuccess={messageSuccess}
                    onDismiss={handleDemissMessageBar} />


                <div className="data-list">
                    <ShimmeredDetailsList
                        items={brands}
                        columns={columns}
                        setKey="set"
                        enableShimmer={loading}
                        selectionMode={SelectionMode.none} />
                </div> 
            </Stack>

            <Panel

                className="panel-form"
                isOpen={openPanel}
                type={PanelType.medium}
                headerText="Cadastro de Marca"
                isFooterAtBottom={true}
                onDismiss={() => setOpenPanel(false)}
                onRenderFooterContent={onRenderFooterContent}>

                <p>Preencha TODOS os campos obrigatórios identificados por <span className="required">*</span></p>

                <Stack horizontal={false} className="panel-form-content">
                    <TextField
                        label="Nome da Marca"
                        required
                        value={brand.name}
                        onChange={event => setBrand({...brand, name: (event.target as HTMLInputElement).value})} />
                </Stack>
                {JSON.stringify(brand)}
            </Panel>
            
        </div>

    )

    }}