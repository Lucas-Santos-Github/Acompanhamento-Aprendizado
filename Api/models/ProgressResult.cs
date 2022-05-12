namespace ProgressoUsuario
{
    public class ProgressResult
    {



        public int userId { get; set; }

        public int progressPercent => (this.currentExp * 100) / this.totalExp;

        public int currentExp { get; set; }
        public int totalExp { get; set; }
        public string nextRanking { get; set; }
        public string currentRanking { get; set; }


    }
}
