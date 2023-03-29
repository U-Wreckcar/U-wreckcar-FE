"use client"
import React, { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
/**
 * Style, Image
 */
import styles from "./CreateUTM.module.css"
import plus from "assets/plus.png"
import minus from "assets/minus.png"
import Image from "next/image"
import { CreateCategory } from "./CreateCategory"
import { postUTMs } from "@/util/async/api"
import Alert from "@/shared/button/Alert"
import { getCookie } from "@/util/async/Cookie"
import { redirect } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Modal } from "@/shared/modal/Modal"
import Loading from "@/shared/modal/Loading"
type UTMsType = {
  utms: {
    utm_url?: string
    utm_campaign_id?: string
    utm_source?: string
    utm_medium?: string
    utm_campaign_name?: string | null
    utm_content?: string | null
    utm_term?: string | null
    utm_memo?: string | null
  }[]
}
type PropsType = {
  setResUTM: any
  resUTM: any
}
export const CreateUTM: React.FC<PropsType> = ({ setResUTM, resUTM }) => {
  const [memoText, setMemoText] = useState("")
  const [alert, setAlert] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  // const [res, setRes] = useState()
  // const { data, isError, isLoading, isSuccess } = useQuery({
  //   queryKey: ["create_utm"],
  //   queryFn: postUTMs,
  // })
  const { mutate, isLoading, isError, isSuccess, data } = useMutation(postUTMs)

  const res = data?.data
  setResUTM(res)
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UTMsType>({
    defaultValues: {
      utms: [
        {
          utm_url: "",
          utm_campaign_id: "",
          utm_source: "",
          utm_medium: "",
          utm_campaign_name: null,
          utm_term: null,
          utm_content: null,
          utm_memo: null,
        },
      ],
    },
    mode: "onBlur",
  })
  const { fields, append, remove } = useFieldArray({
    name: "utms",
    control,
  })
  // const requeirFn = (e: any) => {
  //   e.target.value = e.target.value.replace(/[^a-z0-9./:_-]?/, '');
  //   e.target.value = e.target.value.replace({ maxLength: 70 }, '');
  // };

  const addList = () => {
    if (fields.length <= 4) {
      append({
        utm_url: "",
        utm_campaign_id: "",
        utm_source: "",
        utm_medium: "",
        utm_campaign_name: "",
        utm_content: "",
        utm_term: "",
        utm_memo: "",
      })
    }
  }
  const memoHandler = (e: any) => {
    const textareaValue = e.target?.value
    setMemoText(textareaValue)
  }

  const onSubmit = async (data: UTMsType) => {
    try {
      mutate(data)
      // isSuccess && setAlert(true)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {}, [memoText])

  /**
   * 로그인 하지 않은 유저 로그인 페이지로 보내기
   */
  useEffect(() => {
    const cookie = getCookie("access_token")

    if (!cookie) {
      redirect("/login")
    }
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.scroll_input}>
          <CreateCategory />
          <div className={styles.create_container}>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <div key={field.id}>
                    <div className={styles.item_box}>
                      <div className={styles.number}>{index + 1}</div>

                      <input
                        placeholder='https://를 붙여서 입력해 주세요.'
                        // onInput={requeirFn}
                        type='url'
                        {...register(`utms.${index}.utm_url` as const, {
                          required: true,
                          maxLength: 200,
                        })}
                        className={`${
                          errors?.utms?.[index]?.utm_url
                            ? styles.error
                            : styles.input_style
                        }`}
                      />
                      {/* {errors?.utms?.[index]?.utm_url ? (
                        <p className={styles.red_text}>!</p>
                      ) : (
                        ""
                      )} */}

                      <input
                        placeholder='ex) google, naver, facebook…'
                        // onInput={requeirFn}
                        {...register(`utms.${index}.utm_source` as const, {
                          required: true,
                          maxLength: 20,
                        })}
                        className={`${
                          errors?.utms?.[index]?.utm_source
                            ? styles.error
                            : styles.input_style
                        }`}
                      />

                      <input
                        // onInput={requeirFn}
                        placeholder='ex) email, display, cpc…'
                        {...register(`utms.${index}.utm_medium` as const, {
                          required: true,
                          maxLength: 20,
                          // pattern: /[a-z]/i,
                        })}
                        className={`${
                          errors?.utms?.[index]?.utm_medium
                            ? styles.error
                            : styles.input_style
                        }`}
                      />

                      <input
                        // onInput={requeirFn}
                        placeholder='ex) close_beta, open_beta, open…'
                        {...register(
                          `utms.${index}.utm_campaign_name` as const,
                          { maxLength: 20, required: true }
                        )}
                        className={`${
                          errors?.utms?.[index]?.utm_campaign_name
                            ? styles.error
                            : styles.input_style
                        }`}
                      />

                      <input
                        placeholder='ex) 20230312_UCB, 20230329_abc…'
                        // onInput={requeirFn}
                        {...register(`utms.${index}.utm_campaign_id` as const, {
                          // pattern: /[a-z]/i,
                          maxLength: 20,
                        })}
                        className={`${
                          errors?.utms?.[index]?.utm_campaign_id ? "error" : ""
                        }, ${styles.input_style}`}
                      />
                      <input
                        // onInput={requeirFn}
                        placeholder='ex) GA, UTM..'
                        {...register(`utms.${index}.utm_term` as const, {
                          maxLength: 20,
                        })}
                        className={`${
                          errors?.utms?.[index]?.utm_campaign_id ? "error" : ""
                        }, ${styles.input_style}`}
                      />

                      <input
                        // onInput={requeirFn}
                        placeholder='ex) 1st, 2nd…'
                        {...register(`utms.${index}.utm_content` as const, {
                          maxLength: 20,
                        })}
                        className={`${
                          errors?.utms?.[index]?.utm_campaign_id ? "error" : ""
                        }, ${styles.input_style}`}
                      />

                      <textarea
                        className={`${styles.active}`}
                        placeholder='ex) 캠페인 코멘트, 세션 수 등의 정보'
                        {...register(`utms.${index}.utm_memo` as const, {
                          maxLength: 100,
                        })}
                        spellCheck={false}
                      />
                      <div className={styles.minus_button}>
                        <button
                          className={styles.minus_button_style}
                          type='button'
                          onClick={() => {
                            if (index >= 1) {
                              remove(index)
                            }
                          }}>
                          <Image
                            className={styles.minus_img}
                            src={minus}
                            alt='리스트 삭제'
                            onError={() => {
                              console.log(
                                "리스트 빼기 이미지를 불러올 수 없습니다."
                              )
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.create_button_box}>
          <button
            className={styles.add_list_button}
            type='button'
            onClick={addList}>
            <Image
              className={styles.plus_button_img}
              src={plus}
              alt='추가하기'
              onError={() => {
                console.log("추가버튼 이미지를 불러오지 못했습니다.")
              }}
            />
          </button>
          <div className={styles.create_button_box_section}>
            {alert && (
              <Alert
                title={"성공"}
                contents={"UTM 생성을 성공하셨습니다!"}
                onClickEvent={setAlert}
              />
            )}
            {isLoading && <Loading isOpen={true} />}
            <input
              id='create_btn'
              className={styles.create_button}
              type='submit'
              value='생성하기'
              disabled={isLoading}
              // onClick={() => {
              //   setAlert(true);
              // }}
            />
          </div>
        </div>

        {/* <FirstNameWatched control={control} /> */}
      </form>
    </div>
  )
}
// interface FormInputs {
//   firstName: string;
// }
// function FirstNameWatched({ control }: { control: Control<FormInputs> }) {
//   const firstName = useWatch({
//     control,
//     name: 'firstName', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
//     defaultValue: 'default', // default value before the render
//   });
//   return <p>Watch: {firstName}</p>; // only re-render at the component level, when firstName changes
// }
