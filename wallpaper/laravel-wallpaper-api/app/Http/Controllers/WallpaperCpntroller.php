<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WallpaperCpntroller extends Controller{

    //是否收藏
    public function  WallpaperType (Request $request) {
        $WallpaperId=$request->input("wallpaperId");
        $WxId=$request->input("wxId");
        $wallpaper=DB::table('collection')->where([
            ['Wallpaper_id','=',$WallpaperId],
            ['wx_id','=',$WxId]
        ])->first();
        if(empty($wallpaper)){
            $Prompt=[
                "err"=>200,
                "collection"=>"0"
            ];
        }else{
            $Prompt=[
                "err"=>200,
                "collection"=>"1"
            ];
        }
        return  $Prompt;
    }

    public function collection (Request $request){
        $WallpaperId=$request->input("wallpaperId");
        $WxId=$request->input("wxId");
        $url=$request->input("url");
        $wallpaper=DB::table('collection')->where([
            ['Wallpaper_id','=',$WallpaperId],
            ['wx_id','=',$WxId]
        ])->first();
        if(empty($wallpaper)){
            $bool=DB::table('collection')->insert(
                [
                    "wx_id"=>$WxId,
                    "wallpaper_id"=> $WallpaperId,
                    "url"=>$url,
                ]
            );
            $Prompt=[
                'err'=>200,
                'text'=>"收藏成功",
                'type'=>"1"
            ];
        }else{
            $bool=DB::table('collection')->where([
                ['Wallpaper_id','=',$WallpaperId],
                ['wx_id','=',$WxId]
            ])->delete();
            $Prompt=[
                'err'=>200,
                'text'=>"取消成功",
                'type'=>"0"
            ];
        }
        return  $Prompt;
    }
    public function GetCollection(Request $request){
        $WxId=$request->input("wxId");
        $wallpaper=DB::table('collection')->where([
            ['wx_id','=',$WxId]
        ])->get();
        if(empty($wallpaper)){
            $Prompt=[
                'err'=>200,
                'wallpaper'=>[],
                'type'=>"0"
            ];
        }else{
            $Prompt=[
                'err'=>200,
                'wallpaper'=>$wallpaper,
                'type'=>"1"
            ];
        }
        return  $Prompt;
    }

}