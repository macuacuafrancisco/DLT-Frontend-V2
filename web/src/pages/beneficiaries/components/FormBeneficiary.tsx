import React, { Fragment, useEffect, useState } from 'react';
import { Badge, Button, Steps, Row, Col, Input, message, Space, Form, Tabs, Modal, DatePicker, Checkbox, Select, Radio, Divider } from 'antd';
import './index.css';
import StepDadosPessoais from './StepDadosPessoais';
import StepVulnerabilidadesGerais from './StepVulnerabilidadesGerais';
import StepVulnerabilidadesEspecificas from './StepVulnerabilidadesEspecificas';
import { add, edit } from '@app/utils/beneficiary';
import moment from 'moment';
import { stringify } from 'qs';

const { Option } = Select;
const { Step } = Steps;

const BeneficiaryForm = ({ form, beneficiary, modalVisible, handleAddBeneficiary, handleUpdateBeneficiary, handleModalVisible }: any) => {

    const [current, setCurrent] = useState(0);
    const [firstStepValues, setFirstStepValues] = useState();
    const [secondStepValues, setSecondStepValues] = useState();

    const next = () => {
        form.validateFields().then(async (values) => {
            const inc = current + 1;
            setCurrent(inc);
            current === 0 ? setFirstStepValues(values) : setSecondStepValues(values);
        }).catch(error => {

        });


    }

    const prev = () => {
        const inc = current - 1;
        setCurrent(inc);
    }

    const onSubmit = async () => {
        handleAdd(firstStepValues,"1");
    }

    const handleAdd = (values:any, gender:string) => {

        form.validateFields().then(async (vblts) => {
            setSecondStepValues(vblts);

            const ben: any = beneficiary ? beneficiary : {};
            ben.surname = values.surname;
            ben.name = values.name;
            ben.nickName = values.nick_name;
            ben.dateOfBirth = moment(values.date_of_birth).format('YYYY-MM-DD');
            ben.age = values.age;
            ben.gender=gender;
            ben.address = values.address;
            ben.email = values.e_mail;
            ben.phoneNumber = values.phone_number;
            ben.enrollmentDate = values.enrollment_date;
            ben.nationality = values.nationality;
            ben.entryPoint = values.entry_point;
            ben.neighborhood = { "id": values.neighbourhood_id };
            ben.partnerNUI = values.partner_nui;
            ben.vbltChildren = vblts.vblt_children;
            ben.vbltDeficiencyType = vblts.vblt_deficiency_type;
            ben.vbltHouseSustainer = vblts.vblt_house_sustainer;
            ben.vbltIsDeficient = vblts.vblt_is_deficient;
            ben.vbltIsEmployed = vblts.vblt_is_employed;
            ben.vbltIsOrphan = vblts.vblt_is_orphan;
            ben.vbltIsStudent = vblts.vblt_is_student;
            ben.vbltLivesWith = vblts.vblt_lives_with?.toString();
            ben.vbltMarriedBefore = vblts.vblt_married_before;
            ben.vbltPregnantBefore = vblts.vblt_pregnant_before;
            ben.vbltPregnantOrBreastfeeding = vblts.vblt_pregnant_or_breastfeeding;
            ben.vbltSchoolGrade = vblts.vblt_school_grade;
            ben.vbltSchoolName = vblts.vblt_school_name;
            ben.vbltTestedHiv = vblts.vblt_tested_hiv;
            ben.status="1";
            
            const us = values.us;

            ben.createdBy = localStorage.user;
            ben.partner = { "id": localStorage.organization };
            ben.organizationId = localStorage.organization;
            ben.us = { "id": us === undefined? localStorage.us : us };

            const { data } = await add(ben);
            handleAddBeneficiary(data);
            
            const inc = current + 1;
            setCurrent(inc);

            message.success({
                content: 'Registado com Sucesso!', className: 'custom-class',
                style: {
                    marginTop: '10vh',
                }
            });
        })
        .catch(error => {

            message.error({
                content: 'Não foi possivel Registrar a Beneficiária!', className: 'custom-class',
                style: {
                    marginTop: '10vh',
                }
            });
        });
    }

    const handleUpdate = (firstStepValues, secondStepValues) => {
        form.validateFields().then(async (values) => {
            beneficiary.surname = firstStepValues.surname;
            beneficiary.name = firstStepValues.name;
            beneficiary.nickName = firstStepValues.nick_name;
            beneficiary.dateOfBirth = moment(firstStepValues.date_of_birth).format('YYYY-MM-DD');
            beneficiary.age = firstStepValues.age;
            beneficiary.address = firstStepValues.address;
            beneficiary.email = firstStepValues.e_mail;
            beneficiary.phoneNumber = firstStepValues.phone_number;
            beneficiary.enrollmentDate = firstStepValues.enrollment_date;
            beneficiary.nationality = firstStepValues.nationality;
            beneficiary.entryPoint = firstStepValues.entry_point;
            beneficiary.neighborhood = { "id": firstStepValues.neighbourhood_id };
            beneficiary.partnerNUI = firstStepValues.partner_nui;
            beneficiary.vbltChildren = secondStepValues.vblt_children;
            beneficiary.vbltDeficiencyType = secondStepValues.vblt_deficiency_type;
            beneficiary.vbltHouseSustainer = secondStepValues.vblt_house_sustainer;
            beneficiary.vbltIsDeficient = secondStepValues.vblt_is_deficient;
            beneficiary.vbltIsEmployed = secondStepValues.vblt_is_employed;
            beneficiary.vbltIsOrphan = secondStepValues.vblt_is_orphan;
            beneficiary.vbltIsStudent = secondStepValues.vblt_is_student;
            beneficiary.vbltLivesWith = secondStepValues.vblt_lives_with.toString();
            beneficiary.vbltMarriedBefore = secondStepValues.vblt_married_before;
            beneficiary.vbltPregnantBefore = secondStepValues.vblt_pregnant_before;
            beneficiary.vbltPregnantOrBreastfeeding = secondStepValues.vblt_pregnant_or_breastfeeding;
            beneficiary.vbltSchoolGrade = secondStepValues.vblt_school_grade;
            beneficiary.vbltSchoolName = secondStepValues.vblt_school_name;
            beneficiary.vbltTestedHiv = secondStepValues.vblt_tested_hiv;
            beneficiary.vbltSexuallyActive = values.vblt_sexually_active;
            beneficiary.vbltMultiplePartners = values.vblt_multiple_partners;
            beneficiary.vbltIsMigrant = values.vblt_is_migrant;
            beneficiary.vbltTraffickingVictim = values.vblt_trafficking_victim;
            beneficiary.vbltSexualExploitation = values.vblt_sexual_exploitation;
            beneficiary.vbltSexploitationTime = values.vblt_sexploitation_time;
            beneficiary.vbltVbgVictim = values.vblt_vbg_victim;
            beneficiary.vbltVbgType = values.vblt_vbg_type;
            beneficiary.vbltVbgTime = values.vblt_vbg_time;
            beneficiary.vbltAlcoholDrugsUse = values.vblt_alcohol_drugs_use;
            beneficiary.vbltStiHistory = values.vblt_sti_history;
            beneficiary.vbltSexWorker = values.vblt_sex_worker;
            beneficiary.updatedBy = localStorage.user;

            const us = firstStepValues.us;
            if (us !== undefined) {
                beneficiary.us = us;
            }

            const { data } = await edit(beneficiary);
            handleUpdateBeneficiary(data);

            message.success({
                content: 'Actualizado com Sucesso!', className: 'custom-class',
                style: {
                    marginTop: '10vh',
                }
            });
        })
        .catch(error => {

            message.error({
                content: 'Não foi possivel Actualizar a Beneficiária!', className: 'custom-class',
                style: {
                    marginTop: '10vh',
                }
            });
        });
    };


    const onUpdate = async () => {
        form.validateFields().then(async (values) => {
            handleUpdate(firstStepValues, secondStepValues);
            // TODO: Review these actions... date is not being persisted when included
            // setCurrent(0);
            // form.resetFields();
        }).catch(error => {
            console.log(error)
        });
    }

    const steps = [
        {
            title: 'Dados Pessoais',
            content: <StepDadosPessoais form={form} beneficiary={beneficiary} />,
        },
        {
            title: 'Critérios de Eligibilidade Gerais',
            content: <StepVulnerabilidadesGerais form={form} beneficiary={beneficiary} />,
        },
        {
            title: ' Critérios de Eligibilidade Específicos',
            content: <StepVulnerabilidadesEspecificas form={form} beneficiary={beneficiary} />,
        }
    ];

    return (
        <>
            <Modal
                width={1100}
                bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
                centered
                destroyOnClose
                title={` Registo de Beneficiária`}
                visible={modalVisible}
                onCancel={() => handleModalVisible(false)}
                footer={<div className="steps-action">
                    <Button key="Cancel" onClick={() => handleModalVisible()} >
                        Cancelar
                    </Button>
                    {(current === 1 || (current === 2 && beneficiary != undefined)) && (
                        <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                            Anterior
                        </Button>
                    )}
                    {(current < steps.length - 2 || (current === 1 && beneficiary != undefined)) && (
                        <Button type="primary" onClick={() => next()}>
                            Próximo
                        </Button>
                    )}
                    {(current === steps.length - 2 && beneficiary === undefined)  && (
                        <Button type="primary" onClick={() => onSubmit()}>
                            Salvar
                        </Button>
                    )}
                    {(current === steps.length - 1) && (
                        <Button type="primary" onClick={() => onUpdate()}>
                            Actualizar
                        </Button>
                    )}

                </div>}
            >
                <div>
                    <Form form={form} layout="vertical">

                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}
export default BeneficiaryForm;